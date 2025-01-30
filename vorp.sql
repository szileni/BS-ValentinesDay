INSERT INTO `items` (`item`, `label`, `limit`, `can_remove`, `type`, `usable`, `metadata`, `desc`)
VALUES
   
    ('loveenvelope', 'Love Envelope', 5, 1, 'item_standard', 1, '{}', 'nice item'),
    ('lovewheelspin', 'Love Wheelspin', 5, 1, 'item_standard', 1, '{}', 'nice item')

ON DUPLICATE KEY UPDATE
    `item` = VALUES(`item`),
    `label` = VALUES(`label`),
    `limit` = VALUES(`limit`),
    `can_remove` = VALUES(`can_remove`),
    `type` = VALUES(`type`),
    `usable` = VALUES(`usable`),
    `metadata` = VALUES(`metadata`),
    `desc` = VALUES(`desc`);