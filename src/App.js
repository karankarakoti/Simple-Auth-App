import { useEffect } from "react";
import { useDispatch } from "react-redux";

import MessageAndErrors from "components/MessageAndErrors";
import Routes from "routes";
import ScrollTop from "components/ScrollTop";
import { loadUser } from "redux/actions";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  window.onload = function() {
    var numberInputs = document.querySelectorAll('input[type=number]');
    numberInputs.forEach(function(input) {
      input.addEventListener('mousewheel', function(e) {
        e.preventDefault();
      });
    });
  };

  return(
    <>
      <ScrollTop>
        <Routes />
      </ScrollTop>
      <MessageAndErrors/>
    </>
  )
};

export default App;