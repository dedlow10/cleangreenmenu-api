CREATE TABLE Invitations (
    InvitationGuid varchar(36) NOT NULL PRIMARY KEY,
    EmailAddress VARCHAR(255),
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    RoleId INT NOT NULL,
    ExpiresOn DateTime,
    IsPending BOOLEAN NOT NULL,
    FOREIGN KEY (RoleId) REFERENCES Roles(Id) ON DELETE CASCADE
);

