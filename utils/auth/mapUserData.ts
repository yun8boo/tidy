export const mapUserData = (user: any) => {
  const { uid, email, xa, ya } = user
  return {
    id: uid,
    email,
    token: xa || ya,
  }
}