import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Container from "./components/Container";
import AppBar from "./components/AppBar";
import { useBudgets } from "./contexts/BudgetContext";
import StatsPage from "./components/StatsPage";

function App() {

  const { budgets, page } = useBudgets();
  useEffect(() => {
    // localStorage.clear()
    if (page != 0) {
      const containerElements = document.getElementsByClassName('container');
      for (let i = 0; i < containerElements.length; i++) {
        containerElements[i].style.animation = "boxIn 0.3s forwards 0s";

      }
    }
  }, [page])

  return (
    <>
      <div id="blurBg" />
      <h1 >{page == 0 ? "My Budgets" : "Statistics"}</h1>
      <AppBar />
      <div style={{ display: page == 0 ? "block" : 'none' }} className="budgets">
        <div id="box" className="container-box">
          {budgets.length > 0 ? (
            budgets.map((budget) => (
              <Container
                id={budget.id}
                title={budget.name}
                maxAmount={budget.max}
              />
            ))
          ) : (
            <p className="note">Start adding budgets by clicking on "+"</p>
          )}
        </div>
      </div>
      <StatsPage display={page == 1 ? "block" : 'none'} />
    </>
  );
}

export default App;
