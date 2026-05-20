# Contributing Guide

Thank you for contributing to Semzung!

## 🤝 How to Contribute

### Reporting Bugs

1. **Check existing issues** first
2. **Describe the bug** clearly
3. **Steps to reproduce**
4. **Expected behavior**
5. **Screenshots** if applicable

### Suggesting Features

1. Use title: "Feature: ..."
2. Explain the use case
3. Propose implementation (optional)
4. Discuss alternatives

### Code Contributions

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/semzung.git
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make changes** following code style
4. **Test locally** - all tests passing
5. **Commit with clear message**
   ```bash
   git commit -m "Add amazing feature"
   ```

6. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open Pull Request** with description

## 📝 Code Style

### JavaScript/Node.js
- Use ES6+ features
- Semicolons required
- 2-space indentation
- const/let, no var
- Comments for complex logic

### React
- Functional components
- Hooks pattern
- Props destructuring
- One component per file

### Commit Messages
```
feat: Add mood statistics feature
fix: Fix CORS error in production
docs: Update API documentation
style: Format code with Prettier
test: Add unit tests for auth
refactor: Simplify validation logic
chore: Update dependencies
```

## ✅ Testing Checklist

- [ ] Code runs locally without errors
- [ ] All existing tests pass
- [ ] New tests added for features
- [ ] No console errors/warnings
- [ ] Database migration tested
- [ ] API endpoints tested with curl/Postman
- [ ] Frontend UI tested in Chrome/Firefox
- [ ] Mobile responsiveness checked

## 📚 Documentation

Update these files when relevant:
- `README.md` - Overview changes
- `docs/API.md` - API endpoint changes
- `docs/ARCHITECTURE.md` - Architecture changes
- Code comments - Complex logic

## 🔄 Pull Request Process

1. **Title**: Clear, descriptive title
2. **Description**: Link to issue, explain changes
3. **Type**: feat/fix/docs/style/test
4. **Checklist**: Run your own checks
5. **Screenshots**: For UI changes
6. **Wait for review**: Address feedback

## 🎓 Beginner-Friendly Issues

Look for issues labeled:
- `good-first-issue`
- `help-wanted`
- `documentation`

## 💡 Development Tips

### Running Tests
```bash
cd backend
npm test

cd ../frontend
npm test
```

### Debugging
```bash
# Backend
NODE_DEBUG=* npm run dev

# Frontend  
npm run dev -- --inspect
```

### Database Troubleshooting
```bash
# Verify connection
npm run verify-db
```

## 🚫 Things NOT to Do

- Don't commit `.env` files
- Don't push to main directly
- Don't ignore linting errors
- Don't commit debug code
- Don't update package.json arbitrarily

## 🎉 Recognition

Contributors will be:
- Added to README
- Recognized in commits
- Celebrated in releases

Thank you for making Semzung better!

---

Questions? Open an issue or discuss!
