import { faker } from "@faker-js/faker";

export const generateFakeData = (fields: string[], count: number, locale: string = "en") => {
  const data: Record<string, any>[] = [];

  for (let i = 0; i < count; i++) {
    const record: Record<string, any> = {};

    fields.forEach((field) => {
      switch (field) {
        case "fullName":
          record.fullName = faker.person.fullName();
          break;
        case "email":
          record.email = faker.internet.email();
          break;
        case "phone":
          record.phone = faker.phone.number();
          break;
        case "address":
          record.address = `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`;
          break;
        case "username":
          record.username = faker.internet.username();
          break;
        case "password":
          record.password = faker.internet.password({ length: 12 });
          break;
        case "company":
          record.company = faker.company.name();
          break;
        case "jobTitle":
          record.jobTitle = faker.person.jobTitle();
          break;
        case "dateOfBirth":
          record.dateOfBirth = faker.date.birthdate({ min: 18, max: 80, mode: "age" }).toLocaleDateString();
          break;
        case "uuid":
          record.uuid = faker.string.uuid();
          break;
        case "ipAddress":
          record.ipAddress = faker.internet.ipv4();
          break;
        default:
          record[field] = "";
      }
    });

    data.push(record);
  }

  return data;
};
