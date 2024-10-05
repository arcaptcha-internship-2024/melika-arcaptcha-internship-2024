## What is JWT?
JWT, or JSON Web Token, is a compact, URL-safe means of representing claims to be transferred between two parties.
It is a widely used token-based system for securely transmitting information, often used for authenticating users and managing sessions in modern web applications.


## JWT Structure:
A JWT is composed of three parts, separated by dots.  
<HEADER>.<PAYLOAD>.<SIGNATURE>
  
1. __Header__ : Specifies the type of token and the signing algorithm used.
2. __Payload__ : Contains the claims or information being transferred. Claims can be standard or custom.
2. __Signature__ : A hashed combination of the header, payload, and a secret key. It ensures that the token has not been tampered with.


## How does JWT works?
1. the client logs in using credential (username and password).
2. The server verifies the credentials and generates a JWT containing user information (payload), signs it using a secret key (in symmetric encryption) or a private key (in asymmetric encryption).
3. The client (typically the browser) stores the JWT in local storage or session storage for web applications or cookies.
4. For every subsequent request, the client sends the JWT in the Authorization header of HTTP requests.
5. The server verifies the JWT by checking the signature using the secret key. First it decodes JWT token to retrieve the header and payload, after that it recomputes the signature using the secret key and then compares the computed signature with the signature in the JWT. if they match, the token is valid.


## JWT Security
Securing JSON Web Tokens (JWT) is crucial because JWTs are commonly used for authentication and authorization. If not properly secured, JWTs can be exploited, leading to serious vulnerabilities like unauthorized access, token tampering, and replay attacks.


## Strategies for improving JWT security:
1. __Using strong signing algorithms__: 
  - __HS256 (HMAC + SHA-256)__: Symmetric key algorithm, where the same secret key is used for both signing and verification.
  - __RS256 (RSA + SHA-256)__: Asymmetric key algorithm, using a private key for signing and a public key for verification.
it is better to use RS256 whenever it is possible since asummetric encryption provide higher level of security than symmetric algorithms like HS256.  

2. __Securing the secret key or private key__:
  - Keep secret and private keys safely stored in safe environments like environment variables or secret management systems like AWS Secrets Manager.
  - Rotate keys periodically to mitigate the risk of key leakage.
  - Use long and complex keys for signing to make brute force attacks more difficult

3. __Set short token expiration times__:
  - Set short expiration times for JWTs, especially for access tokens, to reduce the window of opportunity for attackers if the token is compromised.
  - Access tokens typically expire within 15 minutes to 1 hour.
  - Use refresh tokens to allow clients to obtain new access tokens when needed.

4. __Implement Secure Storage__: 
  - Avoid storing JWTs in local storage as it is vulnerable to cross-site scripting (XSS) attacks.
  - Use HTTP-only cookies to store JWTs. These cookies cannot be accessed by JavaScript, reducing the risk of XSS attacks.
  - If using cookies, set the "Secure" and "SameSite" flags to prevent them from being sent over non-HTTPS connections or across different domains.

5. __Use HTTPS for All Token Transmissions__:
  - JWTs should always be transmitted over HTTPS to protect against man-in-the-middle (MITM) attacks where attackers could intercept the token.
  - Enforce HTTPS across your entire application, ensuring that JWTs are never transmitted in plaintext over insecure HTTP.
  - If using cookies, set the "Secure" flag to ensure cookies are only sent over HTTPS.


## Difference between cookies and JWT:
HTTP is a stateless protocol, in that every http call made to a server is like a fresh call, with no memory or state of the previous calls.  
In applications we generally need to maintain login sessions, so that once a user logs in, they can continue to access different parts of the application without having to log in again and again for each subsequent http requests made to the server.  
__There are primarily two different approaches to session management:__
1. Session or Cookies based approach.
2. JWT (JSON Web Tokens) based approach.

After successful authentication, (in case of session-cookie approach) the server generates a “cookie”, OR (in case of JWT approach) the server generates an “accessToken”. 

1. __Session-cookie approach:__
  - Server generates a "sessionId" (signs it using "secret key"), and saves the sessionId in a sessionDB, and sends a cookie with the sessionId to the browser (client side).
  - The browser (client side) receives the cookie in the response from server, and saves it in the cookie storage. 
  - The browser then includes the cookie within every subsequent request to the server.  

The sessionId does not contain any userId information, but is a random string generated and signed by the “secret key”.The sessionId is then saved within a sessionDB. The sessionDB is a database table that maps “sessionId” to “userId”.Since sessionIds are stored in a sessionDB, this approach is sometimes called “stateful” approach to managing sessions, since the “state” or “session” is saved within a DB.

2. __JWT approach:__
  - Server generates an accessToken, encrypting the userId and expiresIn, with the ACCESS_TOKEN_SECRET, and sends the accessToken to the browser (client side).
  - The browser (client side) receives the accessToken and saves it on the client side.
  - The accessToken is included in every subsequent request to the server.  

The accessToken itself contains the encrypted “userId”, and the accessToken is not saved within any sessionDB. Since no DB is required in this approach, it is sometimes called “stateless” approach to managing sessions, since no “state” or “session” is saved within a DB (it is contained within the JWT token itself). The JWT tokens are sometimes referred to as “Bearer Tokens” since all the information about the user i.e. “bearer” is contained within the token.


## Encryption vs Encoding vs Hashing:
1. __Encryption__:
Encryption is an encoding technique in which a message is encoded by using an encryption algorithm in such a way that only authorized personnel can access the message or information. It is a special type of encoding that is used for transferring private data, for example sending a combination of username and password over the internet for email login. In encryption, data to be encrypted(called plain text) is transformed using an encryption algorithm like AES or RSA Encryption Algorithm using a secret key called a cipher. The encrypted data is called ciphertext, and finally, the secret key can be used by the intended recipient to convert it back to plain text.  
There are two types of encryption algorithms – symmetric and asymmetric encryption. In the case of symmetric encryption, data is encoded and decoded with the help of the same key whereas in the case of Asymmetric encryption, data is encoded and decoded with the help of different keys, that is public key and private key.

2. __Encoding__:
In the Encoding method, data is transformed from one form to another. The main aim of encoding is to transform data into a form that is readable by most of the systems or that can be used by any external process. It can’t be used for securing data, various publicly available algorithms are used for encoding. Encoding can be used for reducing the size of audio and video files. Each audio and video file format has a corresponding coder-decoder (codec) program that is used to code it into the appropriate format and then decodes it for playback. no keys are used in encoding.

3. __Hashing__:
In Hashing, data is converted to the hash using some hashing function, which can be any number generated from a string or text. Various hashing algorithms are MD5 and SHA256. Data once hashed is non-reversible. The hash function can be any function that is used to map data of arbitrary size to data of fixed size. The data structure hash table is used for storing data. it is simply used for checking the integrity of the data. No Keys are used in Hashing.