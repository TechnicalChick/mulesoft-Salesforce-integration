import { LightningElement, track, wire } from 'lwc';
import fetchData from '@salesforce/apex/MuleSoftDataFetcher.fetchData';
import UpdateMethod from '@salesforce/apex/newupdate.UpdateMethod';

export default class MuleSoftDataFetcher extends LightningElement {
    @track data;
    @track error;
    @track id;


    @track department = '';
    @track accId = '';
    @track fname = '';
    @track title = '';
    @track id = '';
    @track lname = '';
    @track Birthdate = '';
    @track ContactName = '';

    fetchAllData() {
        this.error = null;
        fetchData({ id: null })
            .then(result => {
                this.data = JSON.parse(result);
                console.log(JSON.parse(result));
            })
            .catch(error => {
                this.error = 'Failed to fetch data from MuleSoft API';
                console.error(error);
            });
    }

    fetchJSData() {
        this.error = null;
        let id = this.id;
        if (id) {
            fetchData({ id })
                .then(result => {
                    this.data = JSON.parse(result);
                    console.log(JSON.parse(result))
                })
                .catch(error => {
                    this.error = 'Failed to fetch data from MuleSoft API';
                    console.error(error);
                });
        }
    }
    handleInput(e){
        this.id = e.target.value;
    }

    async handleUpdate() {
        const fields = {};
        fields.Id = this.recordId;
        fields.Department = this.department;
        fields.AccountId = this.accId;
        fields.FirstName = this.fname;
        fields.Title = this.title;
        fields.OtherId = this.id;
        fields.LastName = this.lname;
        fields.Birthdate = this.Birthdate;
        fields.ContactName = this.ContactName;

        const recordInput = { fields };

        try {
            const updatedRecord = await UpdateMethod({ recordInput });
            this.showToast('Success', 'Record Updated', 'success');
            
        } catch (error) {
            this.showToast('Error', 'Failed to update record', 'error');
            // Handle the error or display an error message
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this[name] = value;
    }
}
