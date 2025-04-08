# Hemmelig 🔐  

**Encrypted secret sharing for everyone**  

![Hemmelig Logo](https://github.com/yourusername/hemmelig/blob/main/assets/logo.png?raw=true)  

## ✨ **What is Hemmelig?**  
Hemmelig (Norwegian for *"secret"*) is a secure, client-side encrypted sharing platform designed to protect your sensitive information. Whether you're sharing passwords, confidential messages, or private files, Hemmelig ensures your data stays encrypted **before** it even touches our servers.  

Built with **TweetNaCl.js** for robust encryption, Hemmelig is perfect for individuals, teams, and organizations that prioritize privacy.  

---

## 🔥 **Key Features**  

- **🔒 End-to-End Encryption** – All encryption happens in your browser.  
- **⏳ Self-Destructing Secrets** – Set expiration times for automatic deletion.  
- **🛡️ Password Protection** – Add an extra layer of security.  
- **🌐 IP Restrictions** – Limit access to specific IP ranges.  
- **📁 File & Text Support** – Share encrypted files or text snippets.  
- **💼 Organizational Use** – Secure team secret sharing.  

---

## 🚀 **Quick Start**  

### **1. Share a Secret**  
```bash
curl -X POST "https://hemmelig.app/api/secrets" \  
     -H "Content-Type: application/json" \  
     -d '{"secret": "My super secret API key", "expireAfter": "1h", "password": "optional-password"}'  
```  

### **2. Retrieve a Secret**  
Visit the generated link or use:  
```bash
curl "https://hemmelig.app/api/secrets/:id"  
```  

### **3. Self-Hosting**  
```bash
docker run -p 3000:3000 hemmelig/hemmelig  
```  
Check out our [Deployment Guide](DEPLOY.md) for full setup instructions.  

---

## 🛠 **Tech Stack**  

- **Frontend**: React, TypeScript, TweetNaCl.js  
- **Backend**: Node.js, Express, PostgreSQL  
- **Security**: AES-256, Secure Hashing, Rate Limiting  
- **Deployment**: Docker, Kubernetes (optional)  

---

## 🤝 **Contribute**  
We welcome contributions! Check out our [Contributing Guidelines](CONTRIBUTING.md).  

1. **Fork** the repo  
2. **Clone** your fork  
3. **Submit** a PR  

---

## 📜 **License**  
Hemmelig is **open-source** under the [MIT License](LICENSE).  

---

## 🔗 **Links**  
- **🌍 Website**: [https://hemmelig.app](https://hemmelig.app)  
- **📖 Docs**: [https://docs.hemmelig.app](https://docs.hemmelig.app)  
- **🐦 Twitter**: [@hemmelig_app](https://twitter.com/hemmelig_app)  

---

**Share secrets safely. 🔐**  

---  

Made with ❤️ and 🔒 by
Badam Narendra Reddy
N Harsh
Vamsi 

---

### **Preview**  
![Hemmelig Preview](https://github.com/yourusername/hemmelig/blob/main/assets/preview.png?raw=true)  
