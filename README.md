# 🏷️ relabeler

**Bulk change GitHub labels like a pro (or a mad scientist).**

Tired of manually clicking your way through GitHub issues to fix labels? Want to save your precious developer fingers from unnecessary clicks? Enter the **relabeler**, a command-line tool that lets you easily bulk change labels in your GitHub repos. Automate your label chaos with style.

---

## 🚀 Features

-   **Bulk Label Updates**: Add a new label to issues with specific labels.
-   **Keep or Replace**: Choose whether to keep the old labels or banish them to the void.
-   **Command-Line Power**: Fully configurable through command-line options.
-   **Quick and Easy**: No PhD in scripting required (just Node.js)!

---

## 🎛️ Options

Here’s what you can use to command the relabeler:

| Option         | Alias | Description                                                                            | Required |
| -------------- | ----- | -------------------------------------------------------------------------------------- | -------- |
| `--from`       | `-f`  | Comma-separated list of labels to find. Example: `bug,help wanted`.                    | ✅       |
| `--to`         | `-t`  | New label to add to matching issues. Example: `enhancement`.                           | ✅       |
| `--api-key`    | `-k`  | Your GitHub API token. More on that below.                                             | ✅       |
| `--repo`       | `-r`  | Target repository in `owner/repo` format. Example: `octocat/Hello-World`.              | ✅       |
| `--remove-old` | `-R`  | Remove old labels (`--from`) from issues after adding the new label. Default: `false`. | ❌       |
| `--help`       | `-h`  | Show help, because even robots need guidance sometimes.                                | ❌       |

---

## 🛠️ Setup

1. **Clone This Repo**:

    ```bash
    git clone https://github.com/yourusername/relabeler.git
    cd relabeler
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Make the Script Executable**:

    ```bash
    chmod +x relabel.js
    ```

4. **Get a GitHub API Key**:  
   You’ll need a GitHub personal access token with `repo` permissions.  
   Follow this guide to generate one: [Creating a personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

5. **Run the Magic**:
    ```bash
    ./relabel.js --from bug,help wanted --to feature --api-key YOUR_API_KEY --repo owner/repo
    ```

---

## ✨ Examples

-   Add the label `awesome` to issues labeled `boring` or `meh`:

    ```bash
    ./relabel.js --from boring,meh --to awesome --api-key YOUR_API_KEY --repo owner/repo
    ```

-   Add `improved` while removing old labels `broken` and `messy`:
    ```bash
    ./relabel.js --from broken,messy --to improved --api-key YOUR_API_KEY --repo owner/repo --remove-old
    ```

---

## 🤔 FAQ

### **Why is it called the relabeler?**

Because it’s a label-changing powerhouse. Enough said.

### **What happens if I mess up?**

Don’t worry, GitHub’s label system is pretty forgiving. Just run the script again to fix things.

### **Why do I need an API key?**

The GitHub REST API doesn’t trust random bots poking at their data. The API key proves you’re a human (or a sentient script with proper credentials).

---

## 📄 License

This project is open-source under the MIT License. Use it, fork it, improve it, and relabel to your heart’s content.

---

## 🚨 Disclaimer

This script might be too powerful for some. Handle with care. Over-relabeling can lead to _Labelception™_, where labels refer to other labels. Use responsibly, and don’t let it go to your head. 👨‍🔬
