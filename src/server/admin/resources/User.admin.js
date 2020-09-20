const AdminBro = require("admin-bro")
const User = require("../../models/User")
const { isAdmin, isAdminOrUserOwner } = require("../permissions")

const {
  before: passwordBeforeHook,
  after: passwordAfterHook,
} = require("../actions/user-password.hook")

const {
  before: uploadBeforeHook,
  after: uploadAfterHook,
} = require("../actions/user-upload.hook")

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    _id: {
      isVisible: false,
    },
    encryptedPassword: {
      isVisible: false,
    },
    avatar: {
      position: 0,
      components: {
        edit: AdminBro.bundle("../components/upload/avatar.edit.tsx"),
        list: AdminBro.bundle("../components/upload/avatar.list.tsx"),
      },
    },
    avatarUrl: {
      position: 1,
      isVisible: {
        list: false,
        edit: true,
        filter: false,
        show: true,
      },
    },
    title: {
      position: 2,
      isVisible: {
        list: true,
        edit: true,
        filter: true,
        show: true,
      },
    },
    email: {
      type: "email",
      isVisible: {
        list: true,
        edit: true,
        filter: true,
        show: true,
      },
      position: 4,
    },
    password: {
      type: "password",
      position: 5,
      isVisible: {
        list: false,
        edit: true,
        filter: false,
        show: false,
      },
    },
    createdAt: {
      position: 6,
      isVisible: {
        list: true,
        edit: false,
        filter: true,
        show: true,
      },
    },
    updatedAt: {
      position: 7,
      isVisible: {
        list: true,
        edit: false,
        filter: true,
        show: true,
      },
    },
  },

  actions: {
    new: {
      isAccessible: isAdmin,
      after: async (response, request, context) => {
        const modifiedResponse = await passwordAfterHook(
          response,
          request,
          context
        )
        return uploadAfterHook(modifiedResponse, request, context)
      },
      before: async (request, context) => {
        const modifiedRequest = await passwordBeforeHook(request, context)
        return uploadBeforeHook(modifiedRequest, context)
      },
    },
    edit: {
      isAccessible: isAdminOrUserOwner,
      after: async (response, request, context) => {
        const modifiedResponse = await passwordAfterHook(
          response,
          request,
          context
        )
        return uploadAfterHook(modifiedResponse, request, context)
      },
      before: async (request, context) => {
        const modifiedRequest = await passwordBeforeHook(request, context)
        return uploadBeforeHook(modifiedRequest, context)
      },
    },
    delete: {
      isAccessible: isAdmin,
      guard: "Are you sure?",
    },
    bulkDelete: {
      isAccessible: isAdmin,
      guard: "Are you sure?",
    },
    show: {
      isAccessible: false,
    },
  },
}

module.exports = {
  options,
  resource: User,
}
