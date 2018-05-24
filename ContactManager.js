class ContactManager{

    constructor(){
        this.surname = "";
        this.phoneNumber = "";
        this.firstname = "";
    }

    static contactManager(){
        ContactManager.contact.surname = ContactManager.surname.value;
        ContactManager.contact.firstname = ContactManager.firstname.value;
        ContactManager.contact.phoneNumber = ContactManager.phoneNumber.value;
        return ContactManager.contact;
    }
    static addContact(){
        try{
            let instance = ContactManager.contactManager();
            console.log(instance.toString());
            ContactManager.Contacts.push(instance);  
            ContactManager.writeContactsToHtmlList(false);
            let jsonValue = JSON.stringify(ContactManager.Contacts);
            console.log(jsonValue);
            localStorage.setItem('Contacts',jsonValue);
            return false;
        }
        catch(error)
        {
            console.error(error);
        }
    }
    

    static writeContactsToHtmlList(isGetContactsFromLocalStorage){
        if(isGetContactsFromLocalStorage){
            for(let contact in ContactManager.Contacts){
                ContactManager.writeContactToHtmlList(ContactManager.Contacts[contact]);
            }
        }
        else{
            let contactsCount = ContactManager.Contacts.length;
            console.log(contactsCount);
            let contact = ContactManager.Contacts[contactsCount-1]
            console.log(contact);
            ContactManager.writeContactToHtmlList(contact);
        }  
    }
    static writeContactToHtmlList(instance){
        let parentElement = document.createElement("UL");
        let listElement;
        for(let element in instance){
            if(instance.hasOwnProperty(element)){
                listElement = document.createElement("LI")
                let listValue = document.createTextNode(element.toString() +":"+"  " + instance[element])
                listElement.appendChild(listValue);
                parentElement.appendChild(listElement);
            }
        }
        ContactManager.contactList.appendChild(parentElement);
    }
    static init(){
        ContactManager.surname = document.querySelector("#Surname");
        ContactManager.firstname = document.querySelector("#Firstname");
        ContactManager.phoneNumber = document.querySelector("#Phonenumber");
        ContactManager.contactList = document.querySelector("#contacts");
    }

    static listContacts(){
        document.querySelector("#contacts").innerHTML = "";
        
        ContactManager.loadLocalStorage();
    }
    static sortContacts(){
        ContactManager.Contacts.sort(function(a,b){
            a.surname < b.surname
                return -1;
            a.surname > b.surname
                return 1;
                
            return 0;
        });
    }
    static loadLocalStorage(){
        let localStorageValue = JSON.parse(localStorage.getItem('Contacts') != null ? localStorage.getItem('Contacts') : "" );
        ContactManager.Contacts = localStorageValue;
        ContactManager.writeContactsToHtmlList(true);
    }
       
}
ContactManager.contact = new ContactManager();
ContactManager.Contacts = [];
ContactManager.surname;
ContactManager.firstname;
ContactManager.phoneNumber;
ContactManager.contactList;


