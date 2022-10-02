import "@vaadin/text-field";
import "@vaadin/button";
import "@vaadin/grid";
import "@vaadin/grid/vaadin-grid-column";
import { html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { View } from '../../views/view';
import './contact-form';
import { listViewStore } from './list-view-store';
import "@vaadin/notification";
import { uiStore } from "Frontend/stores/app-store";
import { ContactForm } from "./contact-form";
import { Grid, GridDataProviderCallback, GridDataProviderParams } from "@vaadin/grid";
import Contact from "Frontend/generated/com/example/application/data/entity/Contact";
import { RouterLocation } from "@vaadin/router";

@customElement('list-view')
export class ListView extends View {

  // TODO: add query decorator to set grid for later use

  // TODO: Implement onBeforeEnter function where
  // listViewStore.company abd listViewStore.status is set accordingly


  // Notable points
  // - Filter field is disabled in offline mode as we can't fetch data from backend
  // - Grid is setup using dataprovider for lazy loading of the data from server and database
  // - TODO: contact-form has data-change event hooked to function
  // - TODO: Icons set to vaadin-text-field and vaadin-button
  render() {
    return html`
      <div class="m-m toolbar gap-s">
          <!-- TODO: set field disabled when offline -->
          <!-- TODO: add vaadin:search icon to prefix slot -->
          <vaadin-text-field
          id="email"
          placeholder="Filter by e-mail"
          .value=${listViewStore.filterText}
          @input=${this.updateFilter}
          clear-button-visible
        >
        </vaadin-text-field>
          <!-- TODO: set buttom disabled when offline -->
        <vaadin-button
          @click=${listViewStore.editNew}>
          <!-- TODO: add vaadin:plus icon to suffix slot -->
          Add Contact
        </vaadin-button>
      </div>
      <div class="flex se-m w-full h-full">
          <!-- TODO: bind dataProvider function to Grid --> 
          <vaadin-grid 
          id="grid"
          theme="no-border no-row-borders row-stripes"
          class="m-m p-s shadow-m grid h-full"
          .selectedItems=${[listViewStore.selectedContact]}
          @active-item-changed=${this.handleGridSelection}
             >
          <vaadin-grid-column path="firstName" auto-width>
            </vaadin-grid-column>
          <vaadin-grid-column path="lastName" auto-width>
            </vaadin-grid-column>
          <vaadin-grid-column path="email" auto-width>
            </vaadin-grid-column>
          <vaadin-grid-column
            path="status.name"
            header="Status"
            auto-width
          ></vaadin-grid-column>
          <vaadin-grid-column
            path="company.name"
            auto-width
            header="Company"
          ></vaadin-grid-column>
        </vaadin-grid>
        <!-- TODO: bind function to data-change event in contact-form -->
        <contact-form 
          class="overflow-auto m-m p-s shadow-m flex flex-col" 
          ?hidden=${!listViewStore.selectedContact}>
        </contact-form>
      </div>
      <vaadin-notification
        theme=${uiStore.message.error ? "error" : "contrast"}
        position="middle"
        .opened=${uiStore.message.open}
        .renderer=${(root: HTMLElement) =>
        (root.textContent = uiStore.message.text)}
      ></vaadin-notification>
    `;
  }

  // TODO: implement handleDataChange function where you clear grid's cache
  // requestUpdate is function from Lit to trigger re-rending of the component

  // TODO: Immplement async dataProvider function which fetches page of data 
  // using listViewStore.fetchPage function
  async dataProvider(params: GridDataProviderParams<Contact>, callback: GridDataProviderCallback<Contact>) {
  }

  // vaadin-grid fires a null-event when initialized,
  // we are not interested in it.
  first = true;
  handleGridSelection(e: CustomEvent) {
    if (this.first) {
      this.first = false;
      return;
    }
    // Find the contact form
    const form = this.getElementsByTagName("contact-form")[0] as ContactForm;
    // TODO: Check if binder is dirty and if yes do not set selected contact
    listViewStore.setSelectedContact(e.detail.value);
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add(
      'flex',
      'flex-col',
      'p-m',
      'h-full'
    );
    this.autorun(() => {
      if (!uiStore.offline) {
        // TODO: add authorities checking
        // uiStore will check user authorites from the server and cache them
      }
      if (listViewStore.selectedContact) {
        this.classList.add("editing");
      } else {
        this.classList.remove("editing");
      }
    });

  }

  // If user enters text to email filter, we reset other filters
  // dataprovider needs to be invalidated to fetch new data
  updateFilter(e: { target: HTMLInputElement }) {
    listViewStore.updateFilter(e.target.value);
    listViewStore.company=null;
    listViewStore.status=null;
    // TODO: Grid needs to be updated after filters changes.
  }

}
