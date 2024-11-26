#!/usr/bin/env node
import fetch from "node-fetch";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
    .option("from", {
        alias: "f",
        type: "string",
        describe: "Comma-separated list of labels to find",
        demandOption: true,
    })
    .option("to", {
        alias: "t",
        type: "string",
        describe: "New label to add",
        demandOption: true,
    })
    .option("api-key", {
        alias: "k",
        type: "string",
        describe: "GitHub API token",
        demandOption: true,
    })
    .option("repo", {
        alias: "r",
        type: "string",
        describe: "Repository in owner/repo format",
        demandOption: true,
    })
    .option("remove-old", {
        alias: "R",
        type: "boolean",
        default: false,
        describe: "Remove old labels",
    })
    .help()
    .alias("help", "h").argv;

const { from, to, apiKey, repo, removeOld } = argv;
const baseApiUrl = "https://api.github.com";

const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
};

async function getIssuesWithLabels(repo, labels) {
    const url = `${baseApiUrl}/repos/${repo}/issues?labels=${labels.join(
        ","
    )}&state=open`;
    const response = await fetch(url, { headers });
    console.debug(response);
    if (!response.ok) {
        throw new Error(`Failed to fetch issues: ${response.statusText}`);
    }
    return response.json();
}

async function updateIssueLabels(repo, issueNumber, labels) {
    const url = `${baseApiUrl}/repos/${repo}/issues/${issueNumber}`;
    const response = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ labels }),
    });
    if (!response.ok) {
        throw new Error(
            `Failed to update issue ${issueNumber}: ${response.statusText}`
        );
    }
    return response.json();
}

async function relabelIssues() {
    try {
        const fromLabels = from.split(",");
        console.debug(fromLabels, from);
        const issues = await getIssuesWithLabels(repo, fromLabels);

        for (const issue of issues) {
            const currentLabels = issue.labels.map((label) => label.name);
            const newLabels = removeOld
                ? currentLabels
                      .filter((label) => !fromLabels.includes(label))
                      .concat(to)
                : currentLabels.concat(to);

            console.log(
                `Updating issue #${issue.number} with labels: ${newLabels.join(
                    ", "
                )}`
            );
            await updateIssueLabels(repo, issue.number, [
                ...new Set(newLabels),
            ]);
        }
        console.log("Label update completed!");
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

relabelIssues();
