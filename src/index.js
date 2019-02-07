import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {LineChart} from 'react-easy-chart';
import { CsvToHtmlTable } from 'react-csv-to-table';
import mlp from './nnet.png';
import rforest from './randomForest.png';


const logits = `
feature,coefficient,p-value
intercept,6.332, 0.001
feature1,0.34, 0.142
feature2,-0.21, 0.110
feature3,3.34, 0.094
feature4,0.8242, 0.001
feature5,0.00042, 0.001
feature6,-6.34, 0.001
feature7,0.873, 0.0143
feature8,-2.89, 0.572
feature9,-0.00009, 0.842
feature10,-0.22, 0.042
`;

const importance = `
feature,relative importance
feature3, 1.0
feature10, 0.84
feature4, 0.81
feature2, 0.79
feature5, 0.78
feature7, 0.654
feature8, 0.34
feature1, 0.31
feature6, 0.09
feature9, 0.0005
`;


const metrics = `
model, AUC, KS, Precision, Recall, F1
neural network, 0.87, 42, 0.90, 0.80, 0.86
random forest, 0.88, 39, 0.88, 0.79, 0.84
gradient boosting, 0.82, 41, 0.82, 0.80, 0.81
logistic regression, 0.84, 44, 0.91, 0.83, 0.85
support vector machine, 0.81, 46, 0.88, 0.84, 0.86
ensemble, 0.90, 51, 0.91, 0.89, 0.90
`;

const weights = `
Layer1 Node, Weight, , Layer2 Node, Weight, , Layer3 Node, Weight 
1,0.234,,1,-0.23,,1,-0.23
2,0.253,,2,-0.45,,2,0.45
3,0.83,,3,0.36,,,
4,-0.744,,4,0.88,,,
5,0.47638,,,,,,
6,0.0923,,,,,,
7,-0.532,,,,,,
8,-0.223,,,,,,
9,0.78765,,,,,,
`;

const sampleData = `
name, format
target, int
feature1, double
feature2, double
feature3, double
feature4, double
feature5, double
feature6, double
feature7, double
feature8, double
feature9, double
feature10, double
feature11, double
feature12, double
feature13, double
`;

///// show the results of the file 
class ShowSchema extends React.Component {
  render() {
    return ( <form> <input type="submit" value="SHOW SCHEMA" /> </form>)
  } 
}

class SaveModels extends React.Component {
  render() {
   return (
      <form> 
      <label> <input name="nnet" type="checkbox" /> Neural Network
        ---> Save model: <input type="text" value="mlp001_jwb"/> 
      </label>  <br />
      <label> <input name="nnet" type="checkbox" /> Gradient Boosted Trees
        ---> Save model: <input type="text" value="gbt001_jwb"/> 
      </label>  <br />
      <label> <input name="nnet" type="checkbox" /> Random Forest
        ---> Save model: <input type="text" value="rf001_jwb"/> 
      </label>  <br />
      <label> <input name="nnet" type="checkbox" /> Logistic Regression
        ---> Save model: <input type="text" value="lreg001_jwb"/> 
      </label>  <br />
      <label> <input name="nnet" type="checkbox" /> SVM
        ---> Save model: <input type="text" value="svm001_jwb"/> 
      </label>  <br />
      <label> <input name="nnet" type="checkbox" /> ENSEMBLE
        ---> Save model: <input type="text" value="ensem001_jwb"/> 
      </label>  
      <br />
      <input type="submit" value="EXPORT" />
      </form>
   );
  }
}


class MachineLearning extends React.Component {
  render() {
   return (
      <form> 
      <label> <input name="nnet" type="checkbox" /> Neural Network
        ---> Hidden Layers: <input type="text" value="2"/> 
        , Hidden Layer Nodes: <input type="text" value="4,5"/>
      </label> 
      <br />
      <label> <input name="lr" type="checkbox" /> Logistic Regression</label> 
      <br />
      <label> <input name="rf" type="checkbox" /> Random Forest
        ---> No. Trees: <input type="text" value="400"/> 
        ,Max Depth: <input type="text" value="12"/>
      </label> 
      <br />
      <label> <input name="gb" type="checkbox" /> Gradient Boosting
        ---> No. Trees: <input type="text" value="200"/> 
        Learn Rate: <input type="text" value="0.05"/>
      </label> 
      <br />
      <label> <input name="svm" type="checkbox" /> SVM </label> 
      <br />
      <input type="submit" value="SUBMIT" />
      </form>
   );
  }
}

class Choices extends React.Component {
  render() {
   return (
      <form> 
       <label> Train sample ratio <input type="text" value="0.5" /> </label>
       <br />
       <b> Weighting for Ensemble...</b> <br />
       <label> Random Forest <input type="text" value="0.3" /> </label>
       <br />
       <label> Logistic Reg. <input type="text" value="0.3" /> </label>
       <br />
       <label> Neural Net <input type="text" value="0.4" /> </label>
       <br />
       <input type="submit" value="TRAIN MODEL(S)" />
      </form>
   ); }
}

///// Get file input from user
class InputFile extends React.Component {
  render() {
    const filename = this.props.filename;
    return (
      <form >
       <label> Enter the file name: <input type="text" value={filename} /> </label>
       <input type="submit" value="LOAD FILE" />
      </form>
    );
  }
}


class Calculator extends React.Component {
  constructor(props) {
    super(props); this.state = {filename: 'features.csv'}
  }

  render() {
    var filename = this.state.filename;

    return (
      <div>
        <h1> User-Driven, Model Deployment Demo </h1>
	<h4> First stage of a two-part demo. First, a model is trained. <br />
	Users can hover over each section for a tutorial on model-building.<br />
	In part two, the trained models are deployed and monitored. <br />
        </h4>
        <p><b>1. User uploads file or selects from list (csv, etc.) ... </b></p>
        <InputFile onFileSubmit={this.handleFileInput} />
        <p><b>2. Show the schema and allow for some user manipulation (create a feature).</b></p>
        <ShowSchema filename={filename}/>
        <CsvToHtmlTable data={sampleData} csvDelimiter="," tableClassName="table table-striped table-hover"/> 
        <p><b>3. Provide user choice for classification algorithms ...</b></p>
        <MachineLearning/>
        <p><b>4. Based on algorithms selected, get additional training parameters ...</b></p>
        <Choices/>
        <p><b>5. Interpreting models & Threshold Analysis...</b></p>
	<p>Neural Network Weights </p>
        <img src={mlp} alt="Logo" />
        <CsvToHtmlTable data={weights} csvDelimiter="," tableClassName="table table-striped table-hover"/> 
	<p>Random Forest - Feature Importance </p>
        <img src={rforest} alt="Logo" />
        <CsvToHtmlTable data={importance} csvDelimiter="," tableClassName="table table-striped table-hover"/> 
	<p>Logistic Regression - Coefficient Interpretation </p>
        <CsvToHtmlTable data={logits} csvDelimiter="," tableClassName="table table-striped table-hover"/> 
        <p><b>6. Model performance metrics ...</b></p>
        <CsvToHtmlTable data={metrics} csvDelimiter="," tableClassName="table table-striped table-hover"/> 
        <p><b>7. ROC's for algorithms ...</b></p>
        <LineChart
         axes
         axisLabels={{x: 'true positive (%)', y: 'false positive (%)'}}
         margin={{top: 10, right: 10, bottom: 50, left: 50}}
         width={500} 
         interpolate={'cardinal'} 
         height={350}
         data={[ [ {x:0.0,y:0.0},{ x: 0.1, y: 0.30 }, { x: 0.2, y: 0.50 }, { x: 0.3, y: 0.60 },{x:0.5,y:0.8},{x:1.0, y:1.0}], [ {x:0.0,y:0.0},{ x: 0.1, y: 0.35 }, { x: 0.2, y: 0.55 }, { x: 0.3, y: 0.70 },{x:0.5,y:0.85},{x:1.0, y:1.0}] ]}
        />
        <p><b>8. Allow user to save model (or ensemble) ...</b></p>
        <SaveModels/>
      </div>
    );
  }
}


ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);

