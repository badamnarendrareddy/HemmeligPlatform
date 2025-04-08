import React, { useState } from "react";
import { encryptData } from "../utils/encryption";
import { db } from "../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import nacl from "tweetnacl";
import "./index.css";

const Share = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [expirationDays, setExpirationDays] = useState(3);
  const [maxViews, setMaxViews] = useState(1);
  const [link, setLink] = useState("");
  const [decryptionKey, setDecryptionKey] = useState("");
  const [error, setError] = useState("");

  const handleShare = async () => {
    try {
      // Generate a random key for encryption
      const key = nacl.randomBytes(nacl.secretbox.keyLength);

      // Encrypt the message
      const { nonce, encrypted } = encryptData(message, key);

      // Calculate expiration date
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expirationDays);

      // Store the encrypted data in Firestore
      const docRef = await addDoc(collection(db, "secrets"), {
        title: title || null, // Optional title
        encrypted, // Base64-encoded encrypted data
        nonce, // Base64-encoded nonce
        key: btoa(String.fromCharCode(...key)), // Base64-encoded key
        password: password || null, // Optional password
        expirationDate, // Expiration date
        maxViews, // Maximum number of views
        views: 0, // Current number of views
        createdAt: serverTimestamp(), // Timestamp for creation
      });

      console.log("Document created with ID:", docRef.id); // Debugging

      // Generate the shareable link with the decryption key as a query parameter
      const secretUrl = `${window.location.origin}/secret/${docRef.id}?key=${btoa(String.fromCharCode(...key))}`;
      console.log("Generated URL:", secretUrl); // Debugging

      setLink(secretUrl);
      setDecryptionKey(btoa(String.fromCharCode(...key)));
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to share the message. Please try again.");
      console.error("Error in handleShare:", err); // Debugging
    }
  };

  return (
    <div className="share-page">
      <div className="share-container">
        <h1>Share Securely</h1>
        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Title (optional)</label>
          <input
            type="text"
            placeholder="Give your secret a memorable title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            placeholder="Enter your sensitive information"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password (optional)</label>
          <input
            type="password"
            placeholder="Add a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Expiration</label>
          <select
            value={expirationDays}
            onChange={(e) => setExpirationDays(Number(e.target.value))}
          >
            <option value={1}>1 day</option>
            <option value={3}>3 days</option>
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
          </select>
        </div>

        <div className="form-group">
          <label>Max Views</label>
          <input
            type="number"
            min="1"
            value={maxViews}
            onChange={(e) => setMaxViews(Number(e.target.value))}
          />
        </div>

        <button className="share-button" onClick={handleShare}>
          Share
        </button>

        {link && (
          <div className="">
            <div className="link-group">
              <label>Secret URL:</label>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </div>

            <div className="link-group">
              <label>Decryption Key:</label>
              <code>{decryptionKey}</code>
            </div>

            <div className="link-group">
              <label>Complete URL:</label>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Share;