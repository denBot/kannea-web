const isAdmin = ({ currentAdmin }) => {
  return currentAdmin && currentAdmin.role === "admin"
}

const isAdminOrUserOwner = ({ currentAdmin, record }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "admin" || record.params._id === currentAdmin._id)
  )
}

const isUserOwner = ({ currentAdmin, record }) => {
  return currentAdmin && record.params._id === currentAdmin._id
}

module.exports = {
  isAdmin,
  isUserOwner,
  isAdminOrUserOwner,
}
