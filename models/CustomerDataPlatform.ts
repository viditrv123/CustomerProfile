interface Address{
    street: string; 
    city: string; 
    state: string; 
    zip: string;
}

interface Customer {
     id?: string; // Unique identifier for the customer profile
     firstName: string; // First name of the customer
     lastName: string; // Last name of the customer
     email: string; // Email address of the customer
     phone: string; // Phone number of the customer
     address: Address,
     createdAt?: Date, // Timestamp when the profile was created
     updatedAt?: Date;
     tag?: string
  }

  interface OptionalFilter {
    id?: string; // Unique identifier for the customer profile
    firstName?: string; // First name of the customer
    lastName?: string; // Last name of the customer
    email?: string; // Email address of the customer
    phone?: string; // Phone number of the customer
    address?: Address,
    createdAt?: Date, // Timestamp when the profile was created
    updatedAt?: Date;
    tag?: string
 }

class CustomerDataPlatform {
    public data:Customer[]=[]
    public idCount:number=0
  
    constructor(firstName: string, lastName: string, email: string, phone:string, address:Address) {

    }

    public addData(firstName: string, lastName: string, email: string, phone:string, address:Address) {
        this.idCount+=1
        this.data.push({
            id: this.idCount.toString(),
            firstName,
          lastName,
          email,
          phone,
          address,
          createdAt:new Date(),
          updatedAt:new Date()
        })
        }

    public retrieveExistingCustomer(custId:string):Customer{
        const index=this.getCustomerDataIndex(custId)
        const existingCustomer:Customer[]=this.data.filter(x=>x.id===custId)
        return existingCustomer[0]
    }

    private getCustomerDataIndex(id:string):number{
        let index = -1;
        this.data.map((item, i) => {
        if (item.id===id) {
          index = i;
         }
       });
       return index
      
    }

    public updateExistingCustomer(id:string,updatedProfile:Customer): void {
        const customerIndex:number=this.getCustomerDataIndex(id)
        this.data[customerIndex]={...updatedProfile, id:this.data[customerIndex].id};
    }

    public deleteExistingCustomer(id:string):void{
        const customerIndex:number=this.getCustomerDataIndex(id)
        this.data.splice(customerIndex,1)
    }

    public retrieveExistingCustomerWithAdditionalFilters( filterProfile: OptionalFilter): Customer[] | undefined {
        const existingCustomer: Customer[] = this.data.filter((customerProfile: Customer) => {
          for (const objectKey in filterProfile) {
            if (customerProfile[objectKey] !== filterProfile[objectKey]) {
              return false;
            }
          }
          return true;
        });
        return existingCustomer;
      }
      
       public display():void{
        console.log(this.data)
       }

       public addTag(id:string, tag:'String'):void{
        const index =this.getCustomerDataIndex(id)
        this.data[index]={...this.data[index], tag}
       }

       public removeTag(id:string):void{
        const index =this.getCustomerDataIndex(id)
        const customerData=this.data[index]
        delete customerData.tag
        this.data[index]=customerData
       }

       public retrieveExistingCustomerWithSpecificTag(tag:string):Customer[]{
        return this.data.filter(customer=>customer.tag===tag)
       }
  }

  const myData = new CustomerDataPlatform( 'Vidit', 'Singh',  'v@gmail.com', '7878767767667',  {street: 'Random Street', city: 'Random city',state: 'Random state', zip: 'Random zip'})
myData.addData('Vidit', 'Singh',  'vidsv@gmail.com', '7878767767667',  {street: 'Random Street', city: 'Random city',state: 'Random state', zip: 'Random zip'})
myData.display()
myData.addData('Here', 'Singh',  'viditv@gmail.com', '7878767767667',  {street: 'Random Street', city: 'Random city',state: 'Random state', zip: 'Random zip'})
myData.addData('Why', 'Singh',  'vidil.com', '7878767767667',  {street: 'Random Street', city: 'Random city',state: 'Random state', zip: 'Random zip'})
myData.display()
console.log(`Display`)
console.log( myData.retrieveExistingCustomer('2'))
console.log(myData.updateExistingCustomer('2',{firstName:'Where', lastName:'Singh',  email:'vidit.singh.vsv@gmail.com', phone:'7878767767667', address: {street: 'Random Street', city: 'Random city',state: 'Random state', zip: 'Random zip'} }))
myData.display()
myData.deleteExistingCustomer('2')
myData.display()
console.log(myData.retrieveExistingCustomerWithAdditionalFilters({id:'1'}))