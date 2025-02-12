const VERIFICATION_CODE_CHECK = (email) => `SELECT code, expires_at FROM verification_codes WHERE email = '${email}'`
const VERIFICATION_CODE_INSERT = (data) => `INSERT INTO verification_codes (email, code, expires_at) VALUES ('${data.email}', '${data.code}', '${data.expires_at}') ON DUPLICATE KEY UPDATE code = '${data.code}', expires_at = '${data.expires_at}'`

module.exports = { 
  VERIFICATION_CODE_CHECK, 
  VERIFICATION_CODE_INSERT
}