# Building the Burger CSS

~~~html
<div class="box">
  <div class="bread-top"></div>
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
}

.salad {
  width: 90%;
  height: 7%;
  background: linear-gradient(#228c1d, #91ce50);
  margin: 2% auto;
  border-radius: 20px;
}

.bread-bottom {
  height: 13%;
  width: 80%;
  background: linear-gradient(#f08e4a, #e27b36);
  box-shadow: inset -15px 0 #c15711; 
  margin: 2% auto;
  border-radius: 0 0 30% 30%;
}

.cheese { 
  width: 91%;
  height: 4.5%;
  background: linear-gradient(#f4d004, #d6bb22);
  margin: 2% auto;
  border-radius: 20px;
}

.beef { 
  width: 82%;
  height: 8%;
  background: linear-gradient(#7f3608, #702e05);
  margin: 2% auto;
  border-radius: 15px;
}

.bacon {
  width: 80%;
  height: 3%;
  background: linear-gradient(#bf3813, #c45e38);
  margin: 2% auto;
}
~~~