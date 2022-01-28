const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
exports.processSignUp = functions.auth.user().onCreate(async user => {
  if (user.email) {
    const adminUsers = admin.firestore().collection('adminUsers')
    const snapshot = await adminUsers.where('email', '==', user.email).get()
    const customClaims = snapshot.empty ? { player: true } : { admin: true }
    return admin
      .auth()
      .setCustomUserClaims(user.uid, customClaims)
      .then(_ => {
        if (!snapshot.empty) {
          const userUpdate = admin.firestore().collection('users')
          userUpdate.doc(user.uid).set({
            name: user.email,
            email: user.email,
            enable: true
          })
          functions.logger.info(`User with email ${user.email} was added as admin and enabled!`)
        }
        const metadataRef = admin.database().ref('metadata/' + user.uid)
        return metadataRef.set({ refreshTime: new Date().getTime() })
      })
      .catch(error => {
        functions.logger.error(`There was an error whilst adding ${user.email} as admin`, error)
      })
  }
  functions.logger.console.warn('There was no email supplied for user, no role added.')
})
