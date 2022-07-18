<script lang="ts">
  import Doughnut from "svelte-chartjs/src/Doughnut.svelte";
  import Card from "$lib/components/Card.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import type { Transaction } from "src/types";
  import { roundToDecimals, roundToDecimalsAsNumber } from "../../utils/round";

  export let incomeCategoryIds: number[];
  export let expenseCategoryIds: number[];
  export let transactions: Transaction[];

  let chartOptions = {
    elements: {
      arc: {
        borderWidth: 0,
      }
    },
    layout: {
      padding: 16,
    },
    locale: 'fi-FI',
    plugins: {
      legend: {
        display: false,
      }
    },
    responsive: true,
    aspectRatio: 1.2
  }

  $: income = transactions
      .filter(tr => incomeCategoryIds.includes(tr.categoryId))
      .reduce((acc, tr) => acc + tr.amount, 0);

  $: expense = transactions
      .filter(tr => expenseCategoryIds.includes(tr.categoryId))
      .reduce((acc, tr) => acc + tr.amount, 0);

  $: chartData = income >= expense 
    ? {
      labels: ["Expense", "Income Left"],
      datasets: [
        {
          data: [expense, income > 0 ? income - expense : 0],
          backgroundColor: ['#66B088', '#8E90B8'],
        }
      ]
    }
    : {
      labels: ["Overspenditure", "Expense"],
      datasets: [
        {
          data: [expense - income, expense],
          backgroundColor: ['#FF5D73', '#8E90B8'],
        }
      ]
    }

  $: incomeSpentPercentage = roundToDecimalsAsNumber(expense / income * 100, 0);
</script>

<div class="summary-container">
  <Card margin="0 0 1rem 0">
    <div slot="content" class="summary-content">
      <SvgIcon icon="arrowUp2" color="#66B088" />
      <div>
        <h3>Total Income</h3>
        <span>{roundToDecimals(income, 2)}</span>
      </div>
    </div>
  </Card>
  <Card margin="0 0 1rem 0">
    <div slot="content" class="summary-content">
      <SvgIcon icon="arrowDown2" color="#FF5D73" />
      <div>
        <h3>Total Expense</h3>
        <span>{roundToDecimals(expense, 2)}</span>
      </div>
    </div>
  </Card>
  <Card margin="0 0 1rem 0">
    <div slot="content" class="summary-content">
      <SvgIcon icon="balances" color="#8E90B8" />
      <div>
        <h3>Balance</h3>
        <span>{roundToDecimals(income - expense, 2)}</span>
      </div>
    </div>
  </Card>
  {#if income > 0}
    <Card>
      <div slot="content" class="summary-content income-spent">
        <h3>Income Spent</h3>
        <Doughnut data={chartData} options={chartOptions} />
          <span
            class="income-spent-percentage"
            style="{incomeSpentPercentage < 100 ? 'left: 44%' : 'left: 43%'}"
          >
            {incomeSpentPercentage}%
          </span>
      </div>
    </Card>
  {/if}
</div>

<style>
  .summary-container {
    width: 600px;
    margin-right: 2rem;
    display: flex;
    flex-direction: column; 
  }
  .summary-content {
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: start;
  }
  .summary-content div {
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
  h3 {
    font-size: 1.3rem;
    margin: 8px 0 16px 0;
  }
  span {
    font-size: 1.1rem;
  }
  .income-spent {
    position: relative;
  }
  .income-spent-percentage {
    position: absolute;
    top: 52.5%;
    font-size: 1.5rem;
  }
</style>