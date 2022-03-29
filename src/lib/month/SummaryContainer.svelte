<script lang="ts">
  import Doughnut from "svelte-chartjs/src/Doughnut.svelte";
  import Card from "$lib/components/Card.svelte";
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
      padding: 48,
    },
    locale: 'fi-FI',
    plugins: {
      legend: {
        display: false,
      }
    },
    responsive: true,
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
  <Card title="Summary">
    <div slot="content" class="summary-content">
      <div class="summary-cell">
        <h3>Total Income</h3>
        <span>{roundToDecimals(income, 2)}</span>
      </div>
      <div class="summary-cell summary-expense">
        <h3>Total Expense</h3>
        <span>{roundToDecimals(expense, 2)}</span>
      </div>
      <div class="summary-cell">
        <h3>Balance</h3>
        <span>{roundToDecimals(income - expense, 2)}</span>
      </div>
    </div>
  </Card>
  {#if income > 0}
    <div class="space" />
    <Card title="Income Spent">
      <div class="income-spent" slot="content">
        <Doughnut data={chartData} options={chartOptions} />
          <span
            class="income-spent-percentage"
            style="{incomeSpentPercentage < 100 ? 'left: 44.5%' : 'left: 43%'}"
          >
            {incomeSpentPercentage}%
          </span>
      </div>
    </Card>
  {/if}
</div>

<style>
  .space {
    margin-top: 1.5rem;
  }
  .summary-container {
    width: 600px;
    margin-right: 2rem;
    display: flex;
    flex-direction: column; 
  }
  .summary-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .summary-cell {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    padding: 16px;
  }
  .summary-expense {
    background-color: var(--background-lighter);
  }
  h3 {
    font-size: 1.3rem;
  }
  span {
    font-size: 1.2rem;
  }
  .income-spent {
    position: relative;
  }
  .income-spent-percentage {
    position: absolute;
    top: 46%;
    left: 44.5%;
  }
</style>