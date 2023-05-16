var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var CustomerDataPlatform = /** @class */ (function () {
    function CustomerDataPlatform(firstName, lastName, email, phone, address) {
        this.data = [];
        this.idCount = 0;
    }
    CustomerDataPlatform.prototype.addData = function (firstName, lastName, email, phone, address) {
        this.idCount += 1;
        this.data.push({
            id: this.idCount.toString(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    };
    CustomerDataPlatform.prototype.retrieveExistingCustomer = function (custId) {
        var index = this.getCustomerDataIndex(custId);
        var existingCustomer = this.data.filter(function (x) { return x.id === custId; });
        return existingCustomer[0];
    };
    CustomerDataPlatform.prototype.getCustomerDataIndex = function (id) {
        var index = -1;
        this.data.map(function (item, i) {
            if (item.id === id) {
                index = i;
            }
        });
        return index;
    };
    CustomerDataPlatform.prototype.updateExistingCustomer = function (id, updatedProfile) {
        var customerIndex = this.getCustomerDataIndex(id);
        this.data[customerIndex] = __assign(__assign({}, updatedProfile), { id: this.data[customerIndex].id });
    };
    CustomerDataPlatform.prototype.deleteExistingCustomer = function (id) {
        var customerIndex = this.getCustomerDataIndex(id);
        this.data.splice(customerIndex, 1);
    };
    CustomerDataPlatform.prototype.retrieveExistingCustomerWithAdditionalFilters = function (filterProfile) {
        var existingCustomer = this.data.filter(function (customerProfile) {
            for (var objectKey in filterProfile) {
                if (customerProfile[objectKey] !== filterProfile[objectKey]) {
                    return false;
                }
            }
            return true;
        });
        return existingCustomer;
    };
    CustomerDataPlatform.prototype.display = function () {
        console.log(this.data);
    };
    CustomerDataPlatform.prototype.addTag = function (id, tag) {
        var index = this.getCustomerDataIndex(id);
        this.data[index] = __assign(__assign({}, this.data[index]), { tag: tag });
    };
    CustomerDataPlatform.prototype.removeTag = function (id) {
        var index = this.getCustomerDataIndex(id);
        var customerData = this.data[index];
        delete customerData.tag;
        this.data[index] = customerData;
    };
    CustomerDataPlatform.prototype.retrieveExistingCustomerWithSpecificTag = function (tag) {
        return this.data.filter(function (customer) { return customer.tag === tag; });
    };
    return CustomerDataPlatform;
}());
var myData = new CustomerDataPlatform('Vidit', 'Singh', 'v@gmail.com', '7878767767667', { street: 'Random Street', city: 'Random city', state: 'Random state', zip: 'Random zip' });
myData.addData('Vidit', 'Singh', 'vidsv@gmail.com', '7878767767667', { street: 'Random Street', city: 'Random city', state: 'Random state', zip: 'Random zip' });
myData.display();
myData.addData('Here', 'Singh', 'viditv@gmail.com', '7878767767667', { street: 'Random Street', city: 'Random city', state: 'Random state', zip: 'Random zip' });
myData.addData('Why', 'Singh', 'vidil.com', '7878767767667', { street: 'Random Street', city: 'Random city', state: 'Random state', zip: 'Random zip' });
myData.display();
console.log("Display");
console.log(myData.retrieveExistingCustomer('2'));
console.log(myData.updateExistingCustomer('2', { firstName: 'Where', lastName: 'Singh', email: 'vidit.singh.vsv@gmail.com', phone: '7878767767667', address: { street: 'Random Street', city: 'Random city', state: 'Random state', zip: 'Random zip' } }));
myData.display();
myData.deleteExistingCustomer('2');
myData.display();
console.log(myData.retrieveExistingCustomerWithAdditionalFilters({ id: '1' }));
