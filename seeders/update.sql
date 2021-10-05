CREATE TABLE `escale`.`commands`
(
    `command_id`                   INT          NOT NULL AUTO_INCREMENT,
    `command_client_fk`            INT          NOT NULL,
    `command_nbr_pax`              INT          NOT NULL,
    `command_evenement_param_fk`   INT          NOT NULL,
    `command_type_gateau_param_fk` INT          NOT NULL,
    `command_forme_param_fk`       INT          NOT NULL,
    `command_decoration`           TEXT         NOT NULL,
    `command_model`                VARCHAR(255) NOT NULL,
    `command_message`              TEXT         NOT NULL,
    `command_observation`          TEXT         NOT NULL,
    `command_montant`              INT          NOT NULL,
    PRIMARY KEY (`command_id`),
    INDEX `client` (`command_client_fk`),
    INDEX `evenement` (`command_evenement_param_fk`),
    INDEX `type_gateau` (`command_type_gateau_param_fk`),
    INDEX `forme` (`command_forme_param_fk`)
);

create table clients
(
    client_id        int          null,
    client_nom       varchar(255) null,
    client_firstname varchar(255) null,
    client_contact   varchar(255) null,
    constraint clients_pk
        primary key (client_id)
);
create table gateaux
(
    gateau_id int auto_increment,
    gateau_nb_pax int null,
    gateau_form_param_fk int null,
    gateau_decoration text null,
    gateau_model varchar(255) null,
    gateau_observation text null,
    gateau_montant int null,
    constraint gateaux_pk
        primary key (gateau_id)
);
alter table gateaux
    add gateau_command_fk int null;

alter table gateaux
    add constraint gateaux_command_fk
        foreign key (gateau_command_fk) references commands (command_id);

-- 04/09/2021 Michaël Jonathan
ALTER TABLE `clients` ADD `created_at` DATETIME NULL , ADD `updated_at` DATETIME NULL;
ALTER TABLE `gateaux` ADD `created_at` DATETIME NULL , ADD `updated_at` DATETIME NULL;
ALTER TABLE `users` ADD `created_at` DATETIME NULL , ADD `updated_at` DATETIME NULL;