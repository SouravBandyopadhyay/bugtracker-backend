import jwt from 'jsonwebtoken'

// generate token that expires in 12 hours
const generateToken = (id) => {
  return jwt.sign({ id }, "sdfgsdfgaskdjfli43345345ghfd", { expiresIn: '12h' })
}

export default generateToken
