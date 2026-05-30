# Git Workflow & Commands Guide

> Complete guide for Git operations in SignCraft Studio project

---

## 📋 Table of Contents

1. [Initial Setup](#initial-setup)
2. [Project Structure](#project-structure)
3. [Daily Workflow](#daily-workflow)
4. [Branching Strategy](#branching-strategy)
5. [Common Commands](#common-commands)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Initial Setup

### Step 1: Initialize Git Repository
```bash
git init
git branch -m main
```

### Step 2: Update .gitignore
```bash
# Create/update .gitignore with:
# - node_modules
# - dist
# - .env
# - .vscode/*
# - *.log
# - test files
```

### Step 3: Create Initial Commit
```bash
git add .
git commit -m "Initial commit: Project description"
```

### Step 4: Create GitHub Repository
```bash
# Using GitHub CLI (recommended)
gh repo create my-website --public --description "Project description" --source=. --remote=origin

# Or create manually on GitHub then:
git remote add origin https://github.com/username/repo-name.git
```

### Step 5: Push to GitHub
```bash
git push -u origin main
```

---

## 📂 Project Structure

```
my-website/
├── .git/                  # Git repository
├── .gitignore            # Files to ignore
├── .github/              # GitHub configuration
├── src/                  # Source code
├── public/               # Static assets
└── docs/                 # Documentation
```

---

## 🌿 Branching Strategy

### Branch Types

```
main (production)
  ├── develop (development)
  │    ├── feature/feature-name
  │    ├── feature/another-feature
  │    └── hotfix/urgent-fix
  └── hotfix/critical-fix
```

### Branch Descriptions

| Branch | Purpose | When to Use |
|--------|---------|-------------|
| **main** | Production code | Stable releases only |
| **develop** | Development code | Daily development work |
| **feature/** | New features | When adding new functionality |
| **hotfix/** | Urgent fixes | Critical production issues |
| **bugfix/** | Bug fixes | Non-critical bug fixes |

---

## 🔄 Daily Workflow

### Starting New Work

```bash
# 1. Switch to develop branch
git checkout develop

# 2. Pull latest changes
git pull origin develop

# 3. Create new feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes
# ... edit files ...

# 5. Check status
git status

# 6. Stage changes
git add .

# 7. Commit changes
git commit -m "Add feature: description"

# 8. Push to remote
git push -u origin feature/your-feature-name
```

### Commit Message Format

```bash
# Format: <type>: <description>

git commit -m "feat: Add user authentication"
git commit -m "fix: Resolve login bug"
git commit -m "docs: Update README"
git commit -m "style: Format code"
git commit -m "refactor: Simplify function"
git commit -m "test: Add unit tests"
git commit -m "chore: Update dependencies"
```

### Creating Pull Request

```bash
# After pushing feature branch:
# 1. Go to GitHub
# 2. Create Pull Request: feature/your-feature-name → develop
# 3. Fill PR template
# 4. Request review
# 5. Merge after approval
```

### Merging Changes

```bash
# After PR is merged:

# 1. Switch back to develop
git checkout develop

# 2. Pull latest changes
git pull origin develop

# 3. Delete local feature branch
git branch -d feature/your-feature-name

# 4. Delete remote feature branch
git push origin --delete feature/your-feature-name
```

### Releasing to Production

```bash
# 1. Switch to develop
git checkout develop

# 2. Pull latest changes
git pull origin develop

# 3. Switch to main
git checkout main

# 4. Merge develop into main
git merge develop

# 5. Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"

# 6. Push to main
git push origin main

# 7. Push tags
git push origin v1.0.0
```

---

## 📝 Common Commands

### Status & Information

```bash
git status                    # Show working tree status
git log --oneline             # Show commit history
git log --graph --decorate    # Show commit history with graph
git branch                    # List all branches
git branch -a                 # List all branches (including remote)
git remote -v                 # Show remote repositories
git diff                      # Show unstaged changes
git diff --staged             # Show staged changes
```

### Branch Operations

```bash
git checkout branch-name              # Switch to branch
git checkout -b new-branch            # Create and switch to new branch
git branch -d branch-name            # Delete local branch
git branch -D branch-name            # Force delete local branch
git push origin --delete branch-name # Delete remote branch
```

### Staging & Committing

```bash
git add file.txt                 # Stage specific file
git add .                        # Stage all changes
git add *.js                     # Stage all JS files
git commit -m "message"          # Commit staged changes
git commit -am "message"         # Stage and commit all changes
git commit --amend               # Amend last commit
```

### Push & Pull

```bash
git push                        # Push to current branch
git push -u origin branch-name  # Push and set upstream
git push origin --all           # Push all branches
git push --tags                 # Push all tags
git pull                        # Pull and merge
git pull --rebase               # Pull and rebase
git fetch                       # Fetch without merging
```

### Undo Operations

```bash
git checkout -- file.txt        # Discard local changes
git reset HEAD file.txt         # Unstage file
git reset --hard HEAD           # Discard all local changes
git reset --soft HEAD~1         # Undo last commit (keep changes)
git reset --hard HEAD~1         # Undo last commit (discard changes)
git revert commit-hash          # Revert specific commit
```

### Merging & Rebasing

```bash
git merge branch-name           # Merge branch into current
git merge --no-ff branch-name  # Merge with commit always
git rebase main                 # Rebase current branch onto main
git rebase -i HEAD~3           # Interactive rebase last 3 commits
```

### Stashing

```bash
git stash                       # Stash current changes
git stash save "message"        # Stash with message
git stash list                  # List stashes
git stash pop                   # Apply and remove stash
git stash drop                  # Remove stash
git stash clear                 # Clear all stashes
```

---

## 🔧 Troubleshooting

### Merge Conflicts

```bash
# When you get merge conflicts:

# 1. Open conflicted files
# Look for: <<<<<<< HEAD
#          Your changes
#          =======
#          Their changes
#          >>>>>>> branch-name

# 2. Resolve conflicts manually
# Edit files to keep desired changes

# 3. Stage resolved files
git add resolved-file.txt

# 4. Complete merge
git commit
```

### Undo Pushed Changes

```bash
# If you pushed something by mistake:

# Option 1: Revert (recommended)
git revert commit-hash
git push

# Option 2: Reset (force push - dangerous!)
git reset --hard commit-hash
git push --force
```

### Fix Last Commit

```bash
# If you made a mistake in last commit:

# Add forgotten files
git add forgotten-file.txt
git commit --amend

# Change commit message
git commit --amend -m "New message"

# Don't amend pushed commits unless necessary!
```

### Recover Lost Commits

```bash
# If you accidentally deleted commits:

git reflog                      # Show history of all operations
git reset --hard commit-hash    # Restore to specific commit
```

### Clean Up

```bash
# Remove untracked files
git clean -f                    # Remove untracked files
git clean -fd                   # Remove untracked files and directories

# Remove local branches that are deleted on remote
git remote prune origin
git fetch --prune
```

---

## 📊 Project-Specific Commands

### Cloudflare Deployment Workflow

```bash
# Before deployment to Cloudflare:

# 1. Ensure on develop or main
git checkout develop

# 2. Pull latest changes
git pull origin develop

# 3. Build project
npm run build

# 4. Deploy to Cloudflare
npx wrangler pages deploy dist --project-name signcraft-studio

# 5. If successful, tag deployment
git tag -a deploy-$(date +%Y%m%d) -m "Deployment $(date +%Y%m%d)"
git push origin deploy-$(date +%Y%m%d)
```

### Feature Development Workflow

```bash
# For new shadcn-vue component:

git checkout develop
git checkout -b feature/shadcn-button
# Add component
# Test component
git add .
git commit -m "feat: Add shadcn button component"
git push -u origin feature/shadcn-button
# Create PR on GitHub
```

---

## 💡 Best Practices

### Commit Guidelines

1. **Commit often** - Small, frequent commits are better than large ones
2. **Write clear messages** - Describe what and why, not how
3. **Use conventional commits** - feat:, fix:, docs:, etc.
4. **Don't commit broken code** - Ensure tests pass before committing
5. **Review changes before committing** - Use `git diff` to review

### Branch Guidelines

1. **Keep main clean** - Only merge tested code to main
2. **Use feature branches** - Never work directly on main or develop
3. **Delete feature branches** - After merging, clean up
4. **Keep branches focused** - One feature per branch
5. **Update regularly** - Pull latest changes before starting work

### Workflow Guidelines

1. **Pull before pushing** - Always pull before push to avoid conflicts
2. **Review your changes** - Check status and diff before committing
3. **Write good PR descriptions** - Explain the why and how
4. **Test before merging** - Ensure your changes work as expected
5. **Communicate** - Let team know what you're working on

---

## 🎯 Quick Reference

### Most Used Commands (90% of time)

```bash
git status              # Check what changed
git add .               # Stage all changes
git commit -m "msg"     # Commit changes
git push                # Push to remote
git pull                # Pull from remote
git checkout branch     # Switch branch
git branch              # List branches
git log --oneline       # Show history
```

### Emergency Commands

```bash
git reset --hard HEAD           # Discard all local changes
git checkout -- file.txt        # Discard file changes
git stash                       # Temporary save changes
git merge --abort               # Cancel merge
git rebase --abort              # Cancel rebase
```

---

## 📱 GitHub Integration

### GitHub CLI Commands

```bash
gh auth login                    # Login to GitHub
gh repo create                   # Create repository
gh pr create                     # Create pull request
gh pr merge                      # Merge pull request
gh issue create                  # Create issue
gh release create                # Create release
```

### GitHub Workflow

1. **Create feature branch** locally
2. **Push branch** to GitHub
3. **Create Pull Request** on GitHub
4. **Request review** from team
5. **Make changes** based on feedback
6. **Merge** after approval
7. **Delete branch** after merging

---

## 🔗 Useful Resources

### Documentation
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [GitHub CLI Documentation](https://cli.github.com/manual/)

### Learning Resources
- [Git Immersion](https://gitimmersion.com/)
- [Learn Git Branching](https://learngitbranching.js.org/)
- [GitHub Skills](https://skills.github.com/)

### Project-Specific
- **Repository**: https://github.com/oilvysirikan/my-website
- **Remote**: origin (https://github.com/oilvysirikan/my-website.git)
- **Branches**: main, develop, feature/*

---

## 📝 Notes

### Current Project Status
- **Repository**: https://github.com/oilvysirikan/my-website
- **Main Branch**: main
- **Development Branch**: develop
- **Current Branch**: main
- **Last Commit**: Initial commit: SignCraft Studio portfolio website

### Important Files
- **.gitignore**: Configured to exclude node_modules, dist, .env, etc.
- **package.json**: Dependencies and scripts
- **wrangler.toml**: Cloudflare deployment configuration

### Deployment
- **Platform**: Cloudflare Pages
- **Project**: signcraft-studio
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

**Last Updated**: 2026-05-30  
**Project**: SignCraft Studio Portfolio Website  
**Maintained by**: SignCraft Studio Development Team