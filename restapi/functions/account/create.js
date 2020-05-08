'use strict';

const AccountRepo = require('../../repositories/accountrepo');
const InvitationRepo = require('../../repositories/invitationrepo');

module.exports.create = async (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  console.log(data);
  let invitation = await InvitationRepo.getById(data.InvitationGuid);
  console.log(invitation);
  if (invitation != null && invitation.IsPending === 1) {
    data.RoleId = invitation.RoleId;
    let userId = await AccountRepo.create(data);
    await InvitationRepo.setInvitationNotPending(data.InvitationGuid);
    const response = {
        statusCode: 200,
        body: JSON.stringify({NewUserId: userId} ),
      };
      return response;
  }
  else {
    const response = {
        statusCode: 404,
      };
      return response;
  } 
};
