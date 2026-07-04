import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Property: "Property";
    readonly Manager: "Manager";
    readonly Tenant: "Tenant";
    readonly Location: "Location";
    readonly Application: "Application";
    readonly Lease: "Lease";
    readonly Payment: "Payment";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const PropertyScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly pricePerMonth: "pricePerMonth";
    readonly securityDeposit: "securityDeposit";
    readonly applicationFee: "applicationFee";
    readonly photoUrls: "photoUrls";
    readonly amenities: "amenities";
    readonly highlights: "highlights";
    readonly isPetsAllowed: "isPetsAllowed";
    readonly isParkingIncluded: "isParkingIncluded";
    readonly beds: "beds";
    readonly baths: "baths";
    readonly squareFeet: "squareFeet";
    readonly propertyType: "propertyType";
    readonly postedDate: "postedDate";
    readonly averageRating: "averageRating";
    readonly numberOfReviews: "numberOfReviews";
    readonly locationId: "locationId";
    readonly managerCognitoId: "managerCognitoId";
};
export type PropertyScalarFieldEnum = (typeof PropertyScalarFieldEnum)[keyof typeof PropertyScalarFieldEnum];
export declare const ManagerScalarFieldEnum: {
    readonly id: "id";
    readonly cognitoId: "cognitoId";
    readonly name: "name";
    readonly email: "email";
    readonly phoneNumber: "phoneNumber";
};
export type ManagerScalarFieldEnum = (typeof ManagerScalarFieldEnum)[keyof typeof ManagerScalarFieldEnum];
export declare const TenantScalarFieldEnum: {
    readonly id: "id";
    readonly cognitoId: "cognitoId";
    readonly name: "name";
    readonly email: "email";
    readonly phoneNumber: "phoneNumber";
};
export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum];
export declare const LocationScalarFieldEnum: {
    readonly id: "id";
    readonly address: "address";
    readonly city: "city";
    readonly state: "state";
    readonly country: "country";
    readonly postalCode: "postalCode";
};
export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum];
export declare const ApplicationScalarFieldEnum: {
    readonly id: "id";
    readonly applicationDate: "applicationDate";
    readonly status: "status";
    readonly propertyId: "propertyId";
    readonly tenantCognitoId: "tenantCognitoId";
    readonly name: "name";
    readonly email: "email";
    readonly phoneNumber: "phoneNumber";
    readonly message: "message";
    readonly leaseId: "leaseId";
};
export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum];
export declare const LeaseScalarFieldEnum: {
    readonly id: "id";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly rent: "rent";
    readonly deposit: "deposit";
    readonly propertyId: "propertyId";
    readonly tenantCognitoId: "tenantCognitoId";
};
export type LeaseScalarFieldEnum = (typeof LeaseScalarFieldEnum)[keyof typeof LeaseScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly amountDue: "amountDue";
    readonly amountPaid: "amountPaid";
    readonly dueDate: "dueDate";
    readonly paymentDate: "paymentDate";
    readonly paymentStatus: "paymentStatus";
    readonly leaseId: "leaseId";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map