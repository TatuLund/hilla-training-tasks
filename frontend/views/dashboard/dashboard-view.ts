import { html } from "lit";
import { customElement }  from "lit/decorators.js"
import { View } from "../view";
import "@vaadin/charts";
import "@vaadin/notification";
import "@vaadin/charts/src/vaadin-chart-series";
import { dashboardViewStore } from "./dashboard-view-store";
import { uiStore } from "Frontend/stores/app-store";
import type { Options } from 'highcharts';

@customElement("dashboard-view")
export class DashboardView extends View {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add("flex", "flex-col", "items-center", "pt-xl");
  }

  tooltipFormatter : Options = {
    tooltip: {
      formatter: function() {
        return this.point.name +": <b>" + this.point.y + "</b>";
      }
    }
  }

  getCompanyStats() {
    if (dashboardViewStore.companyStats.length === 0) {
      return html`<p>Loading stats...</p>`;
    } else {
      return html`
      <div class="chart-wrapper">
        <!-- TODO: bind companyClicked function to point-click event -->
        <vaadin-chart
          tooltip
          .additionalOptions=${this.tooltipFormatter}
          type="column" title="Company">
          <vaadin-chart-series
            .values=${dashboardViewStore.companyStats}
          ></vaadin-chart-series>
        </vaadin-chart>
      </div>
    `;
    }
  }

  getStatusStats() {
    if (dashboardViewStore.statusStats.length === 0) {
      return html`<p>Loading stats...</p>`;
    } else {
      return html`
      <div class="chart-wrapper" >
        <!-- TODO: bind statusClicked function to point-click event -->
        <vaadin-chart 
          tooltip
          .additionalOptions=${this.tooltipFormatter}
          type="pie" title="Status">
          <vaadin-chart-series          
            .values=${dashboardViewStore.statusStats}
          ></vaadin-chart-series>
        </vaadin-chart>
      </div>
    `;
    }
  }

  // Navigate to ListView using company as url parameter
  private companyClicked(e : CustomEvent) {
    if (uiStore.offline) {
      uiStore.showError("Offline: Can't fetch new data.");
      return;
    }
    window.location.assign(e.detail.point.point.name);
  }

  private statusClicked(e : CustomEvent) {
    if (uiStore.offline) {
      uiStore.showError("Offline: Can't fetch new data.");
      return;
    }
    window.location.assign("none/"+e.detail.point.point.name);
  }

  render() {
    return html`
    <!-- TODO: add medium margin, small padding, use primary color, medium rounded border. Make font xl size bold. -->
    <!-- Doc: https://hilla.dev/docs/css/utility-classes -->
    <div class="">
      ${dashboardViewStore.contactCount} contacts
    </div>
    <!-- TODO: Check list-view.ts class names used to create margin, padding and shadow. Use same classes in div below -->
    <div class="flex flex-row flex-wrap">
    ${this.getCompanyStats()}
    ${this.getStatusStats()}
    </div>
    <!-- TODO: Check list-view.ts how vaadin-notification has been defined and analogous definition here -->
  `;
  }
}

