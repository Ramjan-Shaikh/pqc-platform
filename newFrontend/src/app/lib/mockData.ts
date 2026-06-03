export type Status = "PENDING" | "CLONING" | "ANALYZING" | "COMPLETED" | "FAILED";

export interface Analysis {
  id: string;
  repository: string;
  status: Status;
  startTime: string;
  completionTime?: string;
  duration?: string;
  riskScore?: number;
  findings?: Finding[];
}

export interface Finding {
  id: string;
  file: string;
  line: number;
  algorithm: string;
  keySize: number;
  exposure: string;
  tainted: boolean;
  riskScore: number;
  usageType: string;
  recommendedPQC: string;
  confidence: number;
  evidence: string;
  reasoning: string;
}

export const mockAnalyses: Analysis[] = [
  {
    id: "1",
    repository: "facebook/react",
    status: "COMPLETED",
    startTime: "2 hours ago",
    duration: "2m 34s",
    riskScore: 67,
  },
  {
    id: "2",
    repository: "vercel/next.js",
    status: "ANALYZING",
    startTime: "5 minutes ago",
    duration: "5m 12s",
  },
  {
    id: "3",
    repository: "microsoft/vscode",
    status: "COMPLETED",
    startTime: "1 day ago",
    duration: "4m 18s",
    riskScore: 42,
  },
  {
    id: "4",
    repository: "nodejs/node",
    status: "FAILED",
    startTime: "2 days ago",
  },
  {
    id: "5",
    repository: "denoland/deno",
    status: "PENDING",
    startTime: "3 hours ago",
  },
];

export const mockFindings: Finding[] = [
  {
    id: "1",
    file: "src/crypto/signature.java",
    line: 44,
    algorithm: "RSA",
    keySize: 2048,
    exposure: "NETWORK",
    tainted: true,
    riskScore: 85,
    usageType: "SIGNATURE",
    recommendedPQC: "CRYSTALS-Dilithium",
    confidence: 92,
    evidence: `42 | public static void main(String[] args) {
43 |     KeyPairGenerator keyGen = 
44 |     KeyPairGenerator.getInstance("RSA"); ← Detected
45 |     keyGen.initialize(2048);
46 |     KeyPair pair = keyGen.generateKeyPair();`,
    reasoning: "RSA-2048 digital signatures are vulnerable to Shor's algorithm on quantum computers. Network exposure increases risk.",
  },
  {
    id: "2",
    file: "src/auth/encryption.js",
    line: 128,
    algorithm: "ECDSA",
    keySize: 256,
    exposure: "FILE",
    tainted: false,
    riskScore: 72,
    usageType: "SIGNATURE",
    recommendedPQC: "SPHINCS+",
    confidence: 87,
    evidence: `126 | function signData(data) {
127 |   const key = crypto.createPrivateKey(privateKeyPem);
128 |   const sign = crypto.createSign('SHA256'); ← Detected
129 |   sign.update(data);
130 |   return sign.sign(key, 'hex');`,
    reasoning: "ECDSA signatures are vulnerable to quantum attacks. File-based storage reduces immediate exposure.",
  },
  {
    id: "3",
    file: "lib/security/keys.py",
    line: 56,
    algorithm: "AES-128",
    keySize: 128,
    exposure: "MEMORY",
    tainted: true,
    riskScore: 45,
    usageType: "ENCRYPTION",
    recommendedPQC: "AES-256",
    confidence: 94,
    evidence: `54 | def encrypt_data(plaintext, key):
55 |     cipher = Cipher(
56 |         algorithms.AES(key), ← Detected
57 |         modes.GCM(iv),
58 |         backend=default_backend()`,
    reasoning: "AES-128 provides insufficient security margin against Grover's algorithm. Upgrade to AES-256 recommended.",
  },
  {
    id: "4",
    file: "crypto/hash.go",
    line: 92,
    algorithm: "SHA-256",
    keySize: 256,
    exposure: "NETWORK",
    tainted: false,
    riskScore: 25,
    usageType: "HASH",
    recommendedPQC: "SHA-384",
    confidence: 78,
    evidence: `90 | func HashData(data []byte) []byte {
91 |     h := sha256.New()
92 |     h.Write(data) ← Detected
93 |     return h.Sum(nil)
94 | }`,
    reasoning: "SHA-256 has reduced security margin against quantum attacks. SHA-384 or SHA-3 provides better quantum resistance.",
  },
  {
    id: "5",
    file: "security/tls.rs",
    line: 203,
    algorithm: "RSA",
    keySize: 4096,
    exposure: "NETWORK",
    tainted: true,
    riskScore: 78,
    usageType: "KEY_EXCHANGE",
    recommendedPQC: "CRYSTALS-Kyber",
    confidence: 89,
    evidence: `201 | fn setup_tls() -> Result<TlsConfig> {
202 |     let cert = Certificate::from_pem(&cert_pem)?;
203 |     let key = PrivateKey::from_pem(&key_pem)?; ← Detected
204 |     Ok(TlsConfig::new(cert, key))
205 | }`,
    reasoning: "RSA key exchange is vulnerable to quantum attacks. CRYSTALS-Kyber provides quantum-resistant key encapsulation.",
  },
  {
    id: "6",
    file: "core/auth/session.ts",
    line: 167,
    algorithm: "ECDH",
    keySize: 384,
    exposure: "NETWORK",
    tainted: true,
    riskScore: 81,
    usageType: "KEY_EXCHANGE",
    recommendedPQC: "CRYSTALS-Kyber",
    confidence: 91,
    evidence: `165 | async function establishSession(publicKey: string) {
166 |   const ecdh = crypto.createECDH('secp384r1');
167 |   ecdh.generateKeys(); ← Detected
168 |   const sharedSecret = ecdh.computeSecret(publicKey, 'hex', 'hex');
169 |   return sharedSecret;`,
    reasoning: "Elliptic Curve Diffie-Hellman is vulnerable to quantum computers. Network exposure creates immediate risk.",
  },
  {
    id: "7",
    file: "utils/crypto.cpp",
    line: 89,
    algorithm: "DSA",
    keySize: 2048,
    exposure: "FILE",
    tainted: false,
    riskScore: 68,
    usageType: "SIGNATURE",
    recommendedPQC: "CRYSTALS-Dilithium",
    confidence: 85,
    evidence: `87 | void SignDocument(const std::string& document) {
88 |     DSA* dsa = DSA_new();
89 |     DSA_generate_parameters_ex(dsa, 2048, NULL, 0, NULL, NULL, NULL); ← Detected
90 |     DSA_generate_key(dsa);
91 | }`,
    reasoning: "DSA signatures are vulnerable to Shor's algorithm. File-based usage reduces immediate exposure.",
  },
  {
    id: "8",
    file: "backend/encryption.scala",
    line: 34,
    algorithm: "AES-192",
    keySize: 192,
    exposure: "NETWORK",
    tainted: true,
    riskScore: 52,
    usageType: "ENCRYPTION",
    recommendedPQC: "AES-256",
    confidence: 96,
    evidence: `32 | def encryptMessage(plaintext: String, key: Array[Byte]): Array[Byte] = {
33 |   val cipher = Cipher.getInstance("AES/GCM/NoPadding")
34 |   cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(key, "AES")) ← Detected
35 |   cipher.doFinal(plaintext.getBytes)
36 | }`,
    reasoning: "AES-192 provides insufficient quantum security margin. AES-256 is the recommended post-quantum symmetric encryption standard.",
  },
  {
    id: "9",
    file: "services/vault/keys.rb",
    line: 122,
    algorithm: "RSA",
    keySize: 3072,
    exposure: "FILE",
    tainted: false,
    riskScore: 64,
    usageType: "ENCRYPTION",
    recommendedPQC: "CRYSTALS-Kyber",
    confidence: 88,
    evidence: `120 | def generate_keypair
121 |   rsa = OpenSSL::PKey::RSA.new(3072)
122 |   public_key = rsa.public_key ← Detected
123 |   private_key = rsa.to_pem
124 |   { public: public_key, private: private_key }`,
    reasoning: "RSA-3072 encryption is vulnerable to quantum attacks. CRYSTALS-Kyber provides quantum-resistant public key encryption.",
  },
  {
    id: "10",
    file: "middleware/crypto.php",
    line: 78,
    algorithm: "Blowfish",
    keySize: 128,
    exposure: "NETWORK",
    tainted: true,
    riskScore: 71,
    usageType: "ENCRYPTION",
    recommendedPQC: "AES-256",
    confidence: 82,
    evidence: `76 | function encrypt($data, $key) {
77 |     $iv = openssl_random_pseudo_bytes(8);
78 |     $encrypted = openssl_encrypt($data, 'BF-CBC', $key, 0, $iv); ← Detected
79 |     return base64_encode($iv . $encrypted);
80 | }`,
    reasoning: "Blowfish has a small block size vulnerable to birthday attacks. AES-256 is the recommended modern symmetric cipher.",
  },
  {
    id: "11",
    file: "contracts/signature.sol",
    line: 45,
    algorithm: "ECDSA",
    keySize: 256,
    exposure: "NETWORK",
    tainted: true,
    riskScore: 88,
    usageType: "SIGNATURE",
    recommendedPQC: "SPHINCS+",
    confidence: 93,
    evidence: `43 | function verifySignature(bytes32 hash, bytes memory signature) public {
44 |     address signer = ecrecover(hash, v, r, s);
45 |     require(signer == expectedSigner, "Invalid signature"); ← Detected
46 | }`,
    reasoning: "ECDSA on blockchain is vulnerable to quantum attacks with permanent network exposure and high value at risk.",
  },
  {
    id: "12",
    file: "core/tls/handshake.c",
    line: 234,
    algorithm: "DH",
    keySize: 2048,
    exposure: "NETWORK",
    tainted: true,
    riskScore: 79,
    usageType: "KEY_EXCHANGE",
    recommendedPQC: "CRYSTALS-Kyber",
    confidence: 90,
    evidence: `232 | int perform_handshake(SSL *ssl) {
233 |     DH *dh = DH_new();
234 |     DH_generate_parameters_ex(dh, 2048, DH_GENERATOR_2, NULL); ← Detected
235 |     DH_generate_key(dh);
236 |     return SSL_set_tmp_dh(ssl, dh);`,
    reasoning: "Diffie-Hellman key exchange is completely broken by quantum computers. Immediate migration to Kyber required for network protocols.",
  },
];
