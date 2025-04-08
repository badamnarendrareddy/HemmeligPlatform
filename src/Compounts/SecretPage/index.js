import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import nacl from "tweetnacl";
import "./index.css";

const SecretPage = () => {
  const { id } = useParams(); // Get the secret ID from the URL
  const [secret, setSecret] = useState(null);
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [viewsLeft, setViewsLeft] = useState(0);
  const [error, setError] = useState("");
  const [decryptionKey, setDecryptionKey] = useState("");
  const [isDecrypted, setIsDecrypted] = useState(false);

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        console.log("Fetching secret with ID:", id); // Debugging
        const docRef = doc(db, "secrets", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Secret not found or has expired.");
          return;
        }

        const secretData = docSnap.data();
        console.log("Fetched secret data:", secretData); // Debugging
        setSecret(secretData);
        setViewsLeft(secretData.maxViews - secretData.views);

        // Check if the secret has expired or exceeded max views
        if (
          new Date() > secretData.expirationDate.toDate() ||
          secretData.views >= secretData.maxViews
        ) {
          setError("This secret has expired or has been viewed too many times.");
          return;
        }
      } catch (err) {
        console.error("Error fetching secret:", err); // Detailed error logging
        setError("Failed to fetch the secret.");
      }
    };

    fetchSecret();
  }, [id]);

  const handleDecrypt = async () => {
    try {
      if (!decryptionKey) {
        setError("Please enter the decryption key.");
        return;
      }

      const docRef = doc(db, "secrets", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError("Secret not found or has expired.");
        return;
      }

      const secretData = docSnap.data();

      // Decode the key, nonce, and encrypted data
      const key = new Uint8Array(
        atob(decryptionKey)
          .split("")
          .map((char) => char.charCodeAt(0))
      );
      const nonce = new Uint8Array(
        atob(secretData.nonce)
          .split("")
          .map((char) => char.charCodeAt(0))
      );
      const encrypted = new Uint8Array(
        atob(secretData.encrypted)
          .split("")
          .map((char) => char.charCodeAt(0))
      );

      console.log("Key:", key); // Debugging
      console.log("Nonce:", nonce); // Debugging
      console.log("Encrypted:", encrypted); // Debugging

      // Decrypt the message
      const decrypted = nacl.secretbox.open(encrypted, nonce, key);
      if (!decrypted) {
        setError("Invalid decryption key or decryption failed.");
        return;
      }

      const message = new TextDecoder().decode(decrypted);
      setDecryptedMessage(message);
      setIsDecrypted(true);

      // Increment the view count in Firestore
      await updateDoc(docRef, {
        views: secretData.views + 1,
      });

      // Mark the secret as burned if max views are reached
      if (secretData.views + 1 >= secretData.maxViews) {
        setError("This secret has been burned and can no longer be viewed.");
      }
    } catch (err) {
      console.error("Error decrypting secret:", err); // Detailed error logging
      setError("Failed to decrypt the secret.");
    }
  };

  if (error) {
    return (
      <div className="secret-container">
        <p className="error">{error}</p>
        <img  className="img" src='https://tse4.mm.bing.net/th?id=OIP.7NxhNf6jAwu9A6wSKpEjxgAAAA&pid=Api&P=0&h=180' alt="pic"/>
      </div>
    );
  }

  if (!secret) {
    return (
      <div className="secret-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="background">
    <div className="secret-container">
      <h1 className="h1">View Your Secret</h1>
      

      <p className="h1">Views left: {viewsLeft}</p>

      {!isDecrypted ? (
        <>
          <p className="h1">Enter the decryption key:</p>
          <input
            type="text"
            placeholder="Decryption key"
            value={decryptionKey}
            onChange={(e) => setDecryptionKey(e.target.value)}
          />
          <button onClick={handleDecrypt}>Decrypt</button>
        </>
      ) : (
        <>
          <p className="h1">Your secret:</p>
          <div className="secret-message">{decryptedMessage}</div>
        </>
      )}
    </div>
    </div>
  );
};

export default SecretPage;