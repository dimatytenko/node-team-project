const express = require('express');

const router = express.Router();

const { ctrlWrapper, auth, schemaValidation } = require('../../middlewares');
const { days: ctrl } = require('../../controllers');
const { joiSchema } = require('../../models');

// router.get('/', tokenCheck, ctrlWrapper(ctrl.listContacts));

// router.get(
//   '/:contactId',
//   tokenCheck,
//   isValidId(),
//   ctrlWrapper(ctrl.getContactById),
// );

router.post(
  '/',
  auth,
  schemaValidation(joiSchema.dayAdd),
  ctrlWrapper(ctrl.addDay),
);

// router.delete(
//   '/:contactId',
//   tokenCheck,
//   isValidId(),
//   ctrlWrapper(ctrl.removeContactById),
// );

// router.put(
//   '/:contactId',
//   tokenCheck,
//   isValidId(),
//   validation(joiSchema.contactUpd),
//   ctrlWrapper(ctrl.updateContactById),
// );

// router.patch(
//   '/:contactId/favorite',
//   tokenCheck,
//   isValidId(),
//   ctrlWrapper(ctrl.updateStatusContact),
// );

module.exports = router;
