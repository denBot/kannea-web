const Post = require("../../models/Post")

/** @type {AdminBro.ResourceOptions} */
const options = {
  parent: {
    name: "Site Content",
    icon: "Accessibility",
  },
  properties: {
    _id: {
      isVisible: false,
    },
    title: {
      position: 0,
      isVisible: true,
    },
    author: {
      position: 1,
      isVisible: true,
    },
    content: {
      type: "richtext",
      custom: {},
      position: 2,
      isVisible: {
        list: false,
        edit: true,
        filter: false,
        show: true,
      },
    },
    views: {
      position: 3,
      isVisible: {
        list: true,
        edit: false,
        filter: true,
        show: true,
      },
    },
    createdAt: {
      isVisible: {
        list: true,
        edit: false,
        filter: true,
        show: true,
      },
    },
    updatedAt: {
      isVisible: {
        list: true,
        edit: false,
        filter: true,
        show: true,
      },
    },
  },
  actions: {
    show: {
      isAccessible: false,
    },
  },
}

module.exports = {
  options,
  resource: Post,
}
