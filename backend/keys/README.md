## !!! IMPORTANT !!!

Those keys are exposed to public. DO NOT USE THEM

---

You can generate RSA keys in Windows using various tools. Here are the steps generating RSA keys using OpenSSL, which is a popular cryptographic toolkit available for Windows.

#### Using OpenSSL on Windows:

**Step 1: Install OpenSSL:**
Download OpenSSL for Windows from the Win32/Win64 OpenSSL website.

**Step 2: Generate RSA Private Key:**
Open a command prompt and navigate to the OpenSSL bin directory (where you installed OpenSSL).

Run the following command to generate a private key:

> `openssl genrsa -out private-key.pem`

This command generates an RSA private key encrypted with AES256 and stores it in a file named private-key.pem. You will be prompted to set a passphrase to protect the private key.

**Step 3: Generate Corresponding Public Key:**
Once you have the private key, you can derive the corresponding public key:

> `openssl rsa -in private.pem -pubout -out public-key.pem`

This command generates the public key (public-key.pem) from the private key (private-key.pem).

---

##### Notes:

- Ensure you keep your private key secure and never expose it to others.
- Back up your keys securely as losing the private key can lead to data loss.
- These commands generate RSA keys using OpenSSL on Windows. Adjust the filenames and paths as needed. After generating the keys, you can use them within your applications by referencing the paths to these files, as mentioned earlier.
