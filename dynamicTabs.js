import { LightningElement, track } from 'lwc';

import getAccountData from '@salesforce/apex/LWCController.getAccountDataForTabs';
import getContactData from '@salesforce/apex/LWCController.getContactDataForTabs';
import getOpportunityData from '@salesforce/apex/LWCController.getOpportunityDataForTabs';

export default class DynamicTabs extends LightningElement {
    @track activeTab = 'contacts';
    @track accounts = [];
    @track contacts = [];
    @track opportunities = [];
    @track loading = true;
    @track error;

    connectedCallback(){
        this.loadData('contacts');
    }

    handleTabChange(event){
        const tabName = event.target.value;
        this.activeTab = tabName;
        this.loadData(tabName);
    }

    get hasAccounts() {
    return this.accounts && this.accounts.length > 0;
    }

    get hasOpportunities(){
        return this.opportunities && this.opportunities.length > 0;
    }   
    
    get hasContacts(){
        return this.contacts && this.contacts.length > 0;
    }

    loadData(tabName){
        this.loading = true;
        switch(tabName){
            case 'accounts':
                getAccountData()
                    .then(result => {
                        this.accounts = result;
                        this.loading = false;
                    }).catch(error => {
                        this.error = error;
                        this.loading = false;
                    });
                break;
            case 'contacts':
                getContactData()
                    .then(result => {
                        this.contacts = result;
                        this.loading = false;
                    }).catch(error => {
                        this.error = error;
                        this.loading = false;
                    });
                break;
            case 'opportunities':
                getOpportunityData()
                    .then(result => {
                        this.opportunities = result;
                        this.loading = false;
                    }).catch(error => {
                        this.error = error;
                        this.loading = false;
                    });
                break;
    }

    }
}