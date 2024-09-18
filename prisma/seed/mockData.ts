import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('192a0019-929a-430d-8153-3ad7fad33d1c', '1Meagan.Walter@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv12345', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('e1c52dea-53df-43c8-9080-29910510d110', '10Elisha_Roob@hotmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=12', 'inv12345', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('412f64b6-3956-4a45-98ac-2cf0a1a6b373', '19Shad3@hotmail.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=21', 'inv12345', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('4a09f832-fe4f-4a3f-9e48-513feb2bdf0f', '37Karl.Abshire@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=39', 'inv67890', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('77b87327-316d-48f4-abcc-e4abdbb05932', '46Annette81@hotmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=48', 'inv11223', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('8aa36f8c-4abd-47d7-a56e-db70c6254dbf', '55Angus82@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=57', 'inv67890', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('79a5a4ce-4a23-4afc-8e8b-f07f807744f2', '64Christelle.Pacocha@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=66', 'inv67890', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('eba39c4f-fc8b-406b-b0a6-2d9f58c462e7', '73Ines_McDermott@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv44556', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('efa862ad-0592-497e-81d2-0c7c857fa807', '82Elisha23@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=84', 'inv11223', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('447753df-69f1-4852-b007-3deac359eee4', 'u1v2w3x4y5', '{"annus":"vitiosus","bis":"conventus","thema":"cura"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('05ccc16e-dff2-4f13-92e7-118f659664d8', 'p6q7r8s9t0', '{"sponte":"argentum","capio":"autus","spectaculum":"somnus"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('4f9769df-dc88-4004-9723-ed2776ee3c04', 'u1v2w3x4y5', '{"quaerat":"dicta","aliquid":"crux","maiores":"turpis","addo":"aliquam"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('ea86e9de-0db1-4f68-81a8-9b21ea9e88c8', 'k1l2m3n4o5', '{"somnus":"ater","crebro":"apostolus","patruus":"culpa"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('54cf88b0-3a32-4857-97e0-1178915d4ca4', 'f6g7h8i9j0', '{"terreo":"adsuesco","cervus":"aegrus","vulgaris":"amplus","antea":"vulgaris","adsidue":"condico"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('edd7e3df-d612-4861-be77-fcba04199870', 'k1l2m3n4o5', '{"cibo":"vester","deorsum":"incidunt","denique":"numquam","vorax":"debilito","a":"basium"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('4ad9908c-ce04-49c4-947e-63f56bcd6e2c', 'p6q7r8s9t0', '{"quos":"strenuus","alter":"repellat","cur":"depopulo"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('0d136c34-060f-4b1a-bb86-a893ddeae98b', 'f6g7h8i9j0', '{"thesis":"coerceo","socius":"tabernus","nulla":"calco","balbus":"urbanus","sui":"territo"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('d9e296ab-ddb4-4666-835a-6773f777e4d2', 'f6g7h8i9j0', '{"deinde":"eveniet","crudelis":"curto","crebro":"ducimus","quis":"tam"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('9b76cef5-6e76-4840-b7cf-88df39838709', 'f6g7h8i9j0', '{"derelinquo":"carus","cultellus":"totus","laborum":"vos","denego":"admoneo"}'::jsonb);

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('dbd2952b-dd47-446a-ba59-43f02d88e936', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=122');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('bdb04a9b-ff56-43f0-9f3b-f8203074517b', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=125');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('ce5dacbf-605f-4f11-88bf-6fe11f74e743', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=128');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('3d038bda-164b-4468-b048-46abafdca395', 'Pioneer Tech Group', 'https://i.imgur.com/YfJQV5z.png?id=131');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('2947d1d9-61a4-4aa8-89d0-0063a3e89243', 'Future Vision Corp', 'https://i.imgur.com/YfJQV5z.png?id=134');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('926e75ef-5931-42c6-bb4a-7be1a76422a0', 'Global Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=137');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('30507541-e10a-4830-8fe9-0fa13f9df7ff', 'Global Solutions LLC', 'https://i.imgur.com/YfJQV5z.png?id=140');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('01dcedc8-871b-4b39-92a0-a548bc051530', 'Future Vision Corp', 'https://i.imgur.com/YfJQV5z.png?id=143');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('26cbe2b0-38fa-439b-b114-c0ef0f572bc8', 'Future Vision Corp', 'https://i.imgur.com/YfJQV5z.png?id=146');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('94ca00a3-cf9f-4a6c-a63f-9229b22157f1', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=149');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('659136ed-405a-46db-abad-a793a5168c6e', 'Administrator', '4a09f832-fe4f-4a3f-9e48-513feb2bdf0f', 'dbd2952b-dd47-446a-ba59-43f02d88e936');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('ccd4602f-3572-408c-81eb-d154474b8381', 'Project Manager', '77b87327-316d-48f4-abcc-e4abdbb05932', '2947d1d9-61a4-4aa8-89d0-0063a3e89243');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('63626195-59a9-49d2-9768-94101a58d2de', 'Administrator', '77b87327-316d-48f4-abcc-e4abdbb05932', 'bdb04a9b-ff56-43f0-9f3b-f8203074517b');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('3d53c4e2-8a24-4d4d-993f-25c726968df5', 'Developer', 'eba39c4f-fc8b-406b-b0a6-2d9f58c462e7', '3d038bda-164b-4468-b048-46abafdca395');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('ce410ef1-774b-44a7-8f71-2ea49c5c8975', 'Administrator', 'eba39c4f-fc8b-406b-b0a6-2d9f58c462e7', 'dbd2952b-dd47-446a-ba59-43f02d88e936');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('df03b453-502d-4a2f-a633-54650d0ac5b7', 'Developer', 'efa862ad-0592-497e-81d2-0c7c857fa807', '926e75ef-5931-42c6-bb4a-7be1a76422a0');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('90472099-4218-4e6d-a2fd-3d6fc4c24d0a', 'Product Owner', 'efa862ad-0592-497e-81d2-0c7c857fa807', 'ce5dacbf-605f-4f11-88bf-6fe11f74e743');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('011a2c7d-4056-4080-a835-fb61083a863b', 'Product Owner', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '30507541-e10a-4830-8fe9-0fa13f9df7ff');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('1f16b109-8bb5-4074-985a-39a15df742f6', 'Administrator', '4a09f832-fe4f-4a3f-9e48-513feb2bdf0f', 'ce5dacbf-605f-4f11-88bf-6fe11f74e743');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('60c53d33-dbfc-4fdc-ab58-2cfce819f727', 'Administrator', '192a0019-929a-430d-8153-3ad7fad33d1c', 'dbd2952b-dd47-446a-ba59-43f02d88e936');

INSERT INTO "Payment" ("id", "amount", "currency", "status", "paymentDate", "userId") VALUES ('544dde5a-e61c-41f7-8480-6095945c82d2', 882, 'EUR', 'refunded', '2024-03-02T11:15:33.914Z', '8aa36f8c-4abd-47d7-a56e-db70c6254dbf');
INSERT INTO "Payment" ("id", "amount", "currency", "status", "paymentDate", "userId") VALUES ('1500e31d-66f6-4972-ab02-fca3d0c6161e', 269, 'EUR', 'pending', '2025-08-27T13:36:35.346Z', '412f64b6-3956-4a45-98ac-2cf0a1a6b373');
INSERT INTO "Payment" ("id", "amount", "currency", "status", "paymentDate", "userId") VALUES ('adb8e566-6da2-4e66-b4b9-bc50e522e4de', 900, 'GBP', 'completed', '2024-02-13T12:55:18.284Z', '77b87327-316d-48f4-abcc-e4abdbb05932');
INSERT INTO "Payment" ("id", "amount", "currency", "status", "paymentDate", "userId") VALUES ('50cf576b-3774-4c50-b440-df5ab8a0afa2', 774, 'AUD', 'failed', '2024-01-14T18:22:24.991Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Payment" ("id", "amount", "currency", "status", "paymentDate", "userId") VALUES ('6658cbb3-f8cc-446d-9400-fbef502f2f4b', 493, 'JPY', 'failed', '2024-05-12T05:10:20.671Z', 'e1c52dea-53df-43c8-9080-29910510d110');
INSERT INTO "Payment" ("id", "amount", "currency", "status", "paymentDate", "userId") VALUES ('d6056ee7-5ffe-4a9f-9faa-47dcdebbf9d4', 462, 'AUD', 'completed', '2024-07-15T14:11:23.056Z', '412f64b6-3956-4a45-98ac-2cf0a1a6b373');
INSERT INTO "Payment" ("id", "amount", "currency", "status", "paymentDate", "userId") VALUES ('adc4c369-668c-46df-bd88-f7a60cb9f71b', 368, 'AUD', 'pending', '2025-09-06T00:59:03.608Z', '412f64b6-3956-4a45-98ac-2cf0a1a6b373');
INSERT INTO "Payment" ("id", "amount", "currency", "status", "paymentDate", "userId") VALUES ('04b7354a-d4fd-4ba1-8d3c-056b00f2fb73', 469, 'GBP', 'in_progress', '2023-10-16T07:55:32.294Z', '4a09f832-fe4f-4a3f-9e48-513feb2bdf0f');
INSERT INTO "Payment" ("id", "amount", "currency", "status", "paymentDate", "userId") VALUES ('911c6680-5918-4ade-bddd-3fcc916f1cf4', 268, 'AUD', 'completed', '2024-06-05T12:37:07.016Z', 'eba39c4f-fc8b-406b-b0a6-2d9f58c462e7');
INSERT INTO "Payment" ("id", "amount", "currency", "status", "paymentDate", "userId") VALUES ('d0b82526-0078-4d86-8718-62c85d66889c', 770, 'AUD', 'in_progress', '2024-02-15T09:57:55.253Z', 'e1c52dea-53df-43c8-9080-29910510d110');

INSERT INTO "File" ("id", "fileName", "fileUrl", "fileSize", "fileType", "uploadDate", "userId") VALUES ('38358882-0bd6-4381-9e5e-3b12acf21142', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=221', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=222', 340, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=224', '2025-05-02T07:23:11.411Z', 'eba39c4f-fc8b-406b-b0a6-2d9f58c462e7');
INSERT INTO "File" ("id", "fileName", "fileUrl", "fileSize", "fileType", "uploadDate", "userId") VALUES ('0dd1c016-87bb-4a30-adca-af6588ee8c3c', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=227', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=228', 795, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=230', '2024-10-02T03:27:45.479Z', '4a09f832-fe4f-4a3f-9e48-513feb2bdf0f');
INSERT INTO "File" ("id", "fileName", "fileUrl", "fileSize", "fileType", "uploadDate", "userId") VALUES ('377c4629-1b11-4620-ad76-ec3f09772d00', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=233', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=234', 306, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=236', '2024-08-19T00:35:06.497Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "File" ("id", "fileName", "fileUrl", "fileSize", "fileType", "uploadDate", "userId") VALUES ('ef917cdc-6938-4f27-91af-52bf0d2df53f', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=239', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=240', 881, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=242', '2025-06-05T14:46:00.290Z', 'efa862ad-0592-497e-81d2-0c7c857fa807');
INSERT INTO "File" ("id", "fileName", "fileUrl", "fileSize", "fileType", "uploadDate", "userId") VALUES ('36cc50f2-3102-4106-8dbb-a3905157b29a', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=245', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=246', 741, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=248', '2024-07-15T18:16:36.009Z', '79a5a4ce-4a23-4afc-8e8b-f07f807744f2');
INSERT INTO "File" ("id", "fileName", "fileUrl", "fileSize", "fileType", "uploadDate", "userId") VALUES ('90d1bbcc-dce4-44f7-8c9e-eba36cdb1212', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=251', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=252', 40, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=254', '2025-03-29T22:29:00.397Z', '77b87327-316d-48f4-abcc-e4abdbb05932');
INSERT INTO "File" ("id", "fileName", "fileUrl", "fileSize", "fileType", "uploadDate", "userId") VALUES ('80937b50-5617-440f-bb52-f6e8986a122f', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=257', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=258', 794, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=260', '2024-04-28T16:11:54.054Z', 'e1c52dea-53df-43c8-9080-29910510d110');
INSERT INTO "File" ("id", "fileName", "fileUrl", "fileSize", "fileType", "uploadDate", "userId") VALUES ('9a7281c9-ce85-4104-aa05-99f31c83f211', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=263', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=264', 61, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=266', '2025-04-02T23:45:33.640Z', 'eba39c4f-fc8b-406b-b0a6-2d9f58c462e7');
INSERT INTO "File" ("id", "fileName", "fileUrl", "fileSize", "fileType", "uploadDate", "userId") VALUES ('b3cdd778-7d1b-4b5b-8029-46ff4eac0fca', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=269', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=270', 735, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=272', '2025-04-08T21:33:35.348Z', '412f64b6-3956-4a45-98ac-2cf0a1a6b373');
INSERT INTO "File" ("id", "fileName", "fileUrl", "fileSize", "fileType", "uploadDate", "userId") VALUES ('2facdee1-196b-4c41-bbec-68192018c8b3', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=275', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=276', 660, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=278', '2024-02-16T11:32:26.170Z', 'e1c52dea-53df-43c8-9080-29910510d110');

INSERT INTO "MfaConfig" ("id", "isEnabled", "type", "secret", "userId") VALUES ('086d82ea-3ba8-4248-a815-23659f3445c1', false, 'TOTP', 'a1b2c3d4e5f6g7h8i9j0', '77b87327-316d-48f4-abcc-e4abdbb05932');
INSERT INTO "MfaConfig" ("id", "isEnabled", "type", "secret", "userId") VALUES ('ba65c7df-f627-4433-aa28-92baa2e32530', false, 'Email', 'z9y8x7w6v5u4t3s2r1q0', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "MfaConfig" ("id", "isEnabled", "type", "secret", "userId") VALUES ('65e59e5c-8602-4985-bad7-b70b351c68c4', true, 'Hardware Token', 'm1n2b3v4c5x6z7a8s9d0', 'eba39c4f-fc8b-406b-b0a6-2d9f58c462e7');
INSERT INTO "MfaConfig" ("id", "isEnabled", "type", "secret", "userId") VALUES ('6459c83e-2498-4d6f-b267-ac0c2e561193', false, 'Hardware Token', 'k9l8j7h6g5f4d3s2a1q0', '77b87327-316d-48f4-abcc-e4abdbb05932');
INSERT INTO "MfaConfig" ("id", "isEnabled", "type", "secret", "userId") VALUES ('3492a969-ba86-4daf-a1cb-75cfa51fd53a', true, 'Email', 'a1b2c3d4e5f6g7h8i9j0', '4a09f832-fe4f-4a3f-9e48-513feb2bdf0f');
INSERT INTO "MfaConfig" ("id", "isEnabled", "type", "secret", "userId") VALUES ('edf34856-e9c8-48f8-be25-4bee4ff27114', true, 'TOTP', 'z9y8x7w6v5u4t3s2r1q0', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "MfaConfig" ("id", "isEnabled", "type", "secret", "userId") VALUES ('98a28d3a-c4b0-42c5-9fc5-e2f14770dde6', false, 'TOTP', 'a1b2c3d4e5f6g7h8i9j0', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "MfaConfig" ("id", "isEnabled", "type", "secret", "userId") VALUES ('610f6b25-fe5a-4884-89c3-901f486fd588', false, 'Email', 'p0o9i8u7y6t5r4e3w2q1', '77b87327-316d-48f4-abcc-e4abdbb05932');
INSERT INTO "MfaConfig" ("id", "isEnabled", "type", "secret", "userId") VALUES ('c2b94d74-457e-4a2a-9dea-b0f4f786d89d', true, 'Hardware Token', 'p0o9i8u7y6t5r4e3w2q1', '8aa36f8c-4abd-47d7-a56e-db70c6254dbf');
INSERT INTO "MfaConfig" ("id", "isEnabled", "type", "secret", "userId") VALUES ('72b2974a-293d-49bb-b428-d515720151b2', true, 'Hardware Token', 'z9y8x7w6v5u4t3s2r1q0', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "AiResponse" ("id", "query", "response", "userId") VALUES ('2296be7a-fcf1-4c66-a0d5-60edb2827ee0', 'What is the capital of France', 'The benefits of a ketogenic diet include weight loss improved mental focus and increased energy levels.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "AiResponse" ("id", "query", "response", "userId") VALUES ('9b560a19-67db-4f87-b4ce-c620f8ed89bd', 'How does blockchain technology work', 'To implement OAuth2 in a web application you need to set up an authorization server configure client credentials and handle the authorization flow.', 'efa862ad-0592-497e-81d2-0c7c857fa807');
INSERT INTO "AiResponse" ("id", "query", "response", "userId") VALUES ('13a6f7bf-0b26-4c9b-aeda-3a3d510b1c2e', 'What are the benefits of a ketogenic diet', 'To implement OAuth2 in a web application you need to set up an authorization server configure client credentials and handle the authorization flow.', '79a5a4ce-4a23-4afc-8e8b-f07f807744f2');
INSERT INTO "AiResponse" ("id", "query", "response", "userId") VALUES ('0ac9a348-b567-4312-94bc-9b810e73f29f', 'How to implement OAuth2 in a web application', 'The theory of relativity developed by Albert Einstein encompasses two interrelated theories special relativity and general relativity.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "AiResponse" ("id", "query", "response", "userId") VALUES ('be89d989-e14a-4196-836d-b85ee5ebbcdb', 'What are the benefits of a ketogenic diet', 'Blockchain technology works by using a decentralized ledger to record transactions across many computers.', 'e1c52dea-53df-43c8-9080-29910510d110');
INSERT INTO "AiResponse" ("id", "query", "response", "userId") VALUES ('46219512-d315-4877-a207-fc14546b1393', 'Explain the theory of relativity.', 'The benefits of a ketogenic diet include weight loss improved mental focus and increased energy levels.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "AiResponse" ("id", "query", "response", "userId") VALUES ('9dbf083b-fab7-4d4e-8f42-10c695fbed01', 'How to implement OAuth2 in a web application', 'The benefits of a ketogenic diet include weight loss improved mental focus and increased energy levels.', '4a09f832-fe4f-4a3f-9e48-513feb2bdf0f');
INSERT INTO "AiResponse" ("id", "query", "response", "userId") VALUES ('4b3917a8-627d-4b54-b6b5-fd5f5c11daf8', 'How does blockchain technology work', 'The benefits of a ketogenic diet include weight loss improved mental focus and increased energy levels.', '79a5a4ce-4a23-4afc-8e8b-f07f807744f2');
INSERT INTO "AiResponse" ("id", "query", "response", "userId") VALUES ('b661c172-702e-4519-9849-d3fec19407c8', 'How does blockchain technology work', 'The capital of France is Paris.', '77b87327-316d-48f4-abcc-e4abdbb05932');
INSERT INTO "AiResponse" ("id", "query", "response", "userId") VALUES ('56d7db11-1f11-4300-89e6-12aa35594535', 'What is the capital of France', 'To implement OAuth2 in a web application you need to set up an authorization server configure client credentials and handle the authorization flow.', '77b87327-316d-48f4-abcc-e4abdbb05932');

INSERT INTO "Subscription" ("id", "planName", "startDate", "endDate", "status", "userId") VALUES ('e095d0f6-43d2-4641-8e6a-9dc5b2976834', 'Pro Plan', '2024-09-04T21:20:01.020Z', '2024-02-25T23:28:20.092Z', 'canceled', '79a5a4ce-4a23-4afc-8e8b-f07f807744f2');
INSERT INTO "Subscription" ("id", "planName", "startDate", "endDate", "status", "userId") VALUES ('cb8a39d8-5ce2-4289-928d-6130092128da', 'Pro Plan', '2025-06-24T04:23:18.151Z', '2025-04-10T03:58:33.948Z', 'active', '4a09f832-fe4f-4a3f-9e48-513feb2bdf0f');
INSERT INTO "Subscription" ("id", "planName", "startDate", "endDate", "status", "userId") VALUES ('967bb17b-112c-4d38-9807-3a0575efdfe6', 'Enterprise Plan', '2024-08-30T04:34:59.356Z', '2024-06-12T21:02:19.668Z', 'canceled', 'eba39c4f-fc8b-406b-b0a6-2d9f58c462e7');
INSERT INTO "Subscription" ("id", "planName", "startDate", "endDate", "status", "userId") VALUES ('e0a2e9a5-71da-40f1-b999-241637c2ac47', 'Startup Plan', '2024-03-27T23:40:53.009Z', '2023-11-27T05:02:16.079Z', 'expired', '79a5a4ce-4a23-4afc-8e8b-f07f807744f2');
INSERT INTO "Subscription" ("id", "planName", "startDate", "endDate", "status", "userId") VALUES ('278b5a1d-7731-4a8e-bc95-2dce744cd21b', 'Enterprise Plan', '2025-02-06T01:27:20.824Z', '2024-03-27T21:10:27.419Z', 'active', '4a09f832-fe4f-4a3f-9e48-513feb2bdf0f');
INSERT INTO "Subscription" ("id", "planName", "startDate", "endDate", "status", "userId") VALUES ('8e923775-62a6-4d66-bcaf-680c980b9d3f', 'Unlimited Plan', '2025-07-26T17:07:32.947Z', '2025-07-24T02:09:42.245Z', 'active', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Subscription" ("id", "planName", "startDate", "endDate", "status", "userId") VALUES ('ae343eaf-97d5-4454-9781-745be0548c56', 'Unlimited Plan', '2025-05-15T13:40:24.067Z', '2025-03-26T16:27:08.290Z', 'canceled', '4a09f832-fe4f-4a3f-9e48-513feb2bdf0f');
INSERT INTO "Subscription" ("id", "planName", "startDate", "endDate", "status", "userId") VALUES ('66e9578a-fb82-4ffc-a2c0-66469e01f0ee', 'Basic Plan', '2024-05-28T22:21:22.068Z', '2024-07-18T01:15:09.394Z', 'pending', '79a5a4ce-4a23-4afc-8e8b-f07f807744f2');
INSERT INTO "Subscription" ("id", "planName", "startDate", "endDate", "status", "userId") VALUES ('de859b28-c761-4bfd-9592-77a2fbd7daa1', 'Startup Plan', '2024-12-19T03:36:39.289Z', '2024-08-05T05:52:23.668Z', 'active', '77b87327-316d-48f4-abcc-e4abdbb05932');
INSERT INTO "Subscription" ("id", "planName", "startDate", "endDate", "status", "userId") VALUES ('33480781-aef7-4aa5-b755-c49cc9dd76fb', 'Enterprise Plan', '2025-06-12T12:39:12.477Z', '2025-04-11T15:47:30.576Z', 'inactive', 'efa862ad-0592-497e-81d2-0c7c857fa807');

INSERT INTO "AuditLog" ("id", "action", "details", "timestamp", "userId") VALUES ('0e3f9e46-75a0-4e80-ad33-8dc5619e23f4', 'UserLogin', 'Exported user data to CSV format', '2025-02-17T12:48:59.161Z', 'eba39c4f-fc8b-406b-b0a6-2d9f58c462e7');
INSERT INTO "AuditLog" ("id", "action", "details", "timestamp", "userId") VALUES ('b955e3da-8eb3-4285-a5f9-6aa3e351bf0b', 'DataExport', 'Changed password successfully', '2024-07-14T07:15:02.715Z', '8aa36f8c-4abd-47d7-a56e-db70c6254dbf');
INSERT INTO "AuditLog" ("id", "action", "details", "timestamp", "userId") VALUES ('397e8872-4387-4835-a405-b1c8dd040052', 'PasswordChange', 'Processed payment of 100 via Stripe', '2024-10-07T01:22:15.081Z', '192a0019-929a-430d-8153-3ad7fad33d1c');
INSERT INTO "AuditLog" ("id", "action", "details", "timestamp", "userId") VALUES ('6a807202-f406-4ea9-b3c7-b54730a6c369', 'PasswordChange', 'Changed password successfully', '2024-04-12T01:29:36.444Z', 'e1c52dea-53df-43c8-9080-29910510d110');
INSERT INTO "AuditLog" ("id", "action", "details", "timestamp", "userId") VALUES ('ebf3f026-ea09-4601-b911-0dffcd14efed', 'DataExport', 'Updated user profile information', '2025-01-26T15:23:19.884Z', '4a09f832-fe4f-4a3f-9e48-513feb2bdf0f');
INSERT INTO "AuditLog" ("id", "action", "details", "timestamp", "userId") VALUES ('404866b6-e0b9-41ba-a3a5-e25684cbbc77', 'PaymentProcessed', 'Exported user data to CSV format', '2025-08-06T05:24:39.497Z', '4a09f832-fe4f-4a3f-9e48-513feb2bdf0f');
INSERT INTO "AuditLog" ("id", "action", "details", "timestamp", "userId") VALUES ('24809979-1350-4bd0-8e58-bc71ae459987', 'PasswordChange', 'User logged in from IP 192.168.1.1', '2025-06-30T01:23:56.578Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "AuditLog" ("id", "action", "details", "timestamp", "userId") VALUES ('46a23294-9102-4583-be35-4f0168b96d2d', 'UserLogin', 'Changed password successfully', '2023-12-05T17:04:08.317Z', '412f64b6-3956-4a45-98ac-2cf0a1a6b373');
INSERT INTO "AuditLog" ("id", "action", "details", "timestamp", "userId") VALUES ('b4dddd26-04ca-4838-bf64-cb421fd32ea3', 'DataExport', 'Processed payment of 100 via Stripe', '2025-07-16T12:32:01.870Z', '412f64b6-3956-4a45-98ac-2cf0a1a6b373');
INSERT INTO "AuditLog" ("id", "action", "details", "timestamp", "userId") VALUES ('694a4c01-b45a-43f1-8f54-c154554bbab8', 'UserLogin', 'Exported user data to CSV format', '2025-04-03T09:18:25.120Z', '8aa36f8c-4abd-47d7-a56e-db70c6254dbf');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
