# Building the Burger CSS

~~~html
<div class="box">
  <div class="bread-top">
    <div class="seeds"></div>
    <div class="seeds2"></div>
  </div>
  <div class="salad"></div>
  <div class="bacon"></div>
  <div class="cheese"></div>
  <div class="beef"></div>
  <div class="bread-bottom"></div>
</div>
~~~

~~~css
.box {
  width: 500px;
  margin: auto;
  height: 450px;
}

.bread-top {
  height: 20%;
  width: 80%;
  background: linear-gradient(#bc581e, #e27b36);
  border-radius: 50% 50% 0 0;
  box-shadow: inset -15px 0 #c15711;
  margin: 2% auto;
  position: relative;
}

.seeds {
  position: absolute;
  width: 10%;
  height: 15%;
  background-color: white;
  left: 30%;
  top: 50%;
  border-radius: 40%;
  transform: rotate(-20deg);
  box-shadow: inset -2px -3px #c9c9c9;
}

.seeds:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
  left: -170%;
  top: -260%;
  border-radius: 40%;
  transform: rotate(60deg);
  box-shadow: inset -1px 2px #c9c9c9;
}

.seeds:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
  left: 180%;
  top: -50%;
  border-radius: 40%;
  transform: rotate(60deg);
  box-shadow: inset -1px -3px #c9c9c9;
}

.seeds2 {
  position: absolute;
  width: 10%;
  height: 15%;
  background-color: white;
  left: 64%;
  top: 50%;
  border-radius: 40%;
  transform: rotate(10deg);
  box-shadow: inset -3px -0 #c9c9c9;
}

.seeds2:after {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  content: "";
  left: 150%;
  top: -130%;
  border-radius: 40%;
  transform: rotate(90deg);
  box-shadow: inset 1px 3px #c9c9c9;
}

.salad {
  width: 90%;
  height: 7%;
  background: linear-gradient(#228c1d, #91ce50);
  margin: 2% auto;
  border-radius: 20px;
}

.bacon {
  width: 80%;
  height: 3%;
  background: linear-gradient(#bf3813, #c45e38);
  margin: 2% auto;
}

.cheese {
  width: 91%;
  height: 4.5%;
  background: linear-gradient(#f4d004, #d6bb22);
  border-radius: 20px;
  margin: 2% auto;
}

.meat {
  width: 82%;
  height: 8%;
  background: linear-gradient(#7f3608, #702e05);
  border-radius: 15px;
  margin: 2% auto;
}

.bread-bottom {
  height: 13%;
  width: 80%;
  background: linear-gradient(#f08e4a, #e27b36);
  margin: 2% auto;
  box-shadow: inset -15px 0 #c15711;
  border-radius: 0 0 30px 30px;
}
~~~