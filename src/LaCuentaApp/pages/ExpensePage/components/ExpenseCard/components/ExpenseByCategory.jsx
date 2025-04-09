import React, { useEffect, useState } from 'react';

export const ExpenseByCategory = ({ expensesData }) => {
  const [categoryTotals, setCategoryTotals] = useState({});
  const [expensesTotal, setExpensesTotal] = useState()
  
  useEffect(() => {
    if (!Array.isArray(expensesData)) return;

    const resultado = expensesData.reduce((acc, gasto) => {
      const categoria = gasto.category;
      const monto = parseFloat(gasto.amount) || 0;

      if (!acc[categoria]) {
        acc[categoria] = 0;
      }

      acc[categoria] += monto;

      return acc;
    }, {});

       // Calcular el total de todos los gastos
    const total = expensesData.reduce((acc, gasto) => {
      acc += parseFloat(gasto.amount) || 0; // Aseguramos que se sumen los montos correctamente
      return acc;
    }, 0); 

    

    setCategoryTotals(resultado);
    setExpensesTotal(total)
  }, [expensesData]);

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Categoría</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right', padding: '8px' }}>Total (€)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(categoryTotals).map(([categoria, total]) => (
            <tr key={categoria}>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{categoria}</td>
              <td style={{ borderBottom: '1px solid #eee', textAlign: 'right', padding: '8px' }}>
                {total.toFixed(2)} €
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td style={{ textAlign: 'left', padding: '8px', fontWeight: 'bold' }}>Total</td>
            <td style={{ textAlign: 'right', padding: '8px', fontWeight: 'bold' }}>
              {expensesTotal?.toFixed(2)} €
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
