import NewExpenseForm from "./NewExpenseForm"

export default async function NewExpensePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Record New Expense</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add an outgoing business cost or subscription to calculate accurate dashboard profitability.
        </p>
      </div>

      <NewExpenseForm />
    </div>
  )
}
