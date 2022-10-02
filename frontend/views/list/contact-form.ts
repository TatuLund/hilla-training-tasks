import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../view';
import '@vaadin/date-picker';
import '@vaadin/text-field';
import '@vaadin/combo-box';
import '@vaadin/button';
import '@vaadin/icon';
import '@vaadin/icons';
import { Binder, field } from '@hilla/form';
import ContactModel from 'Frontend/generated/com/example/application/data/entity/ContactModel';
import { crmStore, uiStore } from 'Frontend/stores/app-store';
import { listViewStore } from './list-view-store';

@customElement('contact-form')
export class ContactForm extends View {

  // TODO: define new Binder instance with ContactModel
  // make binder public as we need to access it from ListView
 
  @state()
  private loading = false;

  constructor() {
    super();
    // TODO: Use this.autorun to set callback to populate the form using binder.read function.
  }

  // Form has various modes of operation
  // - TODO: When offline we show fields and buttons disabled
  // - TODO: We allow editing only for ADMIN role
  // - Note, elso update and delete end points are protected, see TODO item in CrmEndpoint.java
  render() {
    // TODO: pick model from the Binder
    return html`
      <!-- TODO: Add bindings to to fields using field(model.property) -->
      <!-- TODO: Create custom validator to test date is today or past as PastOrPresent is not included in binder -->
      <vaadin-text-field
        label="First name"
      ></vaadin-text-field>
      <vaadin-text-field
        label="Last name"
      ></vaadin-text-field>
      <vaadin-text-field
        label="Email"
      ></vaadin-text-field>
      <vaadin-combo-box
        label="Company"
        .items=${crmStore.companies}
        item-label-path="name"
      >
      </vaadin-combo-box>
      <vaadin-combo-box
        label="Status"
        .items=${crmStore.statuses}
        item-label-path="name"
      ></vaadin-combo-box>
      <vaadin-date-picker
        label="Date"
      >
      </vaadin-date-picker>
      <!-- TODO: disable save button if binder is invalid or not dirty (=does not have changes) -->
      <div class="buttons border-contrast-30 border-t mt-auto flex justify-between">
        <vaadin-button
          theme="primary"
          @click=${this.save}
          ?disabled=${uiStore.offline || this.loading }
        >
        <!-- TODO: Set text of the same button to be "Save" if value has id property, else "Create" -->
        <vaadin-icon icon="vaadin:disc"></vaadin-icon>
        </vaadin-button>
        <!-- TODO: Set delete button to be deleted if value does not id property -->
        <vaadin-button
          theme="error"
          @click=${this.delete}
          ?disabled=${uiStore.offline || this.loading }
        >
          <vaadin-icon icon="vaadin:trash"></vaadin-icon>
          Delete
        </vaadin-button>
        <vaadin-button theme="tertiary" @click=${listViewStore.cancelEdit}>
          Cancel
        </vaadin-button>
      </div>
    `;
  }

  async delete() {
    await listViewStore.delete();
    this.submitDataChange();
  }

  async save() {
    this.loading = true;
    // TODO: delegate saving of the object to listViewStore.save using binder.submitTo
    // and clear the form after saving
    this.loading = false;
    // TODO: notify list view that item has been saved and Grid needs to be updated
  }

  // TODO: dispatch a custom event so that ListView can observe changes
  private submitDataChange() {
  }
}
