CREATE TABLE Menu (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    RestaurantId INT NOT NULL,
    MenuData json,
    CreatedOn DATETIME,
    FOREIGN KEY (RestaurantId) REFERENCES Restaurant(Id) ON DELETE CASCADE
);
