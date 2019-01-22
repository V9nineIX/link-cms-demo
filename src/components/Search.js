import React from 'react';
import {
  FormGroup,
  Form,
  Row,
  Col,
  Button,
  Label,
  Card,
  Input,
  CardHeader,
  CardBody
} from 'reactstrap';
//   pattern = >
//
//   var objcategory = {"email":[{"name":"admin@hyp.live","id":"1"},{"name":"sadada","id":"2"}],"username":""};
//   var keySearch =["displayName","username"];
//   cbFunction = (obj) =>{
//     const Users = new Loopback('users');
//     Users.find(obj).then((result)=>{
//       console.log('result',result);
//     })
//   }
//   <Search keySearch={keySearch} filter={objcategory} cbFunction={this.cbFunction}/>
//             key: this.props.keySearch,
//             filter: this.props.filter,
//             fn: { where: { or: [] } },
//             keyword: { like: "", option: "i" },
//             keywordSelect: "",
//             keywordText: "",
//             returnfilter: [],
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.keySearch = this.props.keySearch;
    this.filter = this.props.filter;
    this.fn = {
      where: {
        or: []
      }
    };
    this.keyword = {
      like: "",
      options: "i",
    };
    this.keywordSelect = "";
    this.keywordText = "";
    this.returnfilter = [];
  }
  checkData = (data) => {
    return Object
      .keys(data)
      .map((item, index) => {
        return Array.isArray(data[item])
          ? this.renderArray(data[item], item)
          : this.renderInput(data[item], item);
      });
  }
  // render Keyword
  setKeyword = (evt) => {
    this.keywordText = evt.target.value;
  }
  deleteDuplicateKey = (key) => {
    this
      .returnfilter
      .forEach((element, index) => {
        for (var objkey in element) {
          if (objkey === key) {
            this
              .returnfilter
              .splice(index, 1);
          }
        }
      });
  }
  //SetObject from select
  setObjectforFilter = (event, key, data) => {
    this.deleteDuplicateKey(key);
    if (event.target.value !== 'default') {
      var obj = {};
      this.keywordSelect = event.target.value;
      obj[key] = this.keywordSelect;
      this
        .returnfilter
        .push(obj);
    }
  }
  //SetFilterKeyword that not array
  setFilterKeyword = (event, key) => {
    this.deleteDuplicateKey(key);
    if (event.target.value.length > 0) {
      var obj = {};
      this.keyword.like = event.target.value;
      obj[key] = this.keyword;
      this
        .returnfilter
        .push(obj);
    }
  }
  //SetObj for PropsFunction
  returnObjtoCallbackFunction = () => {
    this
      .keySearch
      .forEach(element => {
        this
          .fn
          .where
          .or
          .forEach((element2, index) => {
            for (var objkey in element2) {
              if (objkey === element) {
                this
                  .fn
                  .where
                  .or
                  .splice(index, 1);
              }
            }
          });
        var obj = {};
        this.keyword.like = this.keywordText;
        obj[element] = this.keyword;
        this
          .fn
          .where
          .or
          .push(obj);
      });
    this.returnfilter.length>0?this.fn.where.and = this.returnfilter:delete this.fn.where.and;
    this
      .props
      .cbFunction(this.fn);
  }
  //renderDataFromObj
  renderArray = (data, key) => {
    return (
      <FormGroup key={key} className="col-xl-3" style={{
        float: 'left'
      }}>
        {/*<Label>{key}</Label>*/}
        <Input key={key} type="select" onChange={(e) => this.setObjectforFilter(e, key, data)}>
          {data.map((item, index) => <option key={key,
          item.key} value={item.key}>{item.value}</option>)}
        </Input>
      </FormGroup>
    )
  }
  //renderInput,
  renderInput = (data, key) => {
    return (
      <FormGroup className="col-xl-3" style={{
        float: 'left'
      }}>
        {/*<Label >{key}</Label>*/}
        <Input key={key} onChange={(e) => this.setFilterKeyword(e, key)}></Input>
      </FormGroup>
    )
  }
  render() {
    return (
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>Search</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup className={this.props.styleSearch?this.props.styleSearch:"col-xl-3"} style={{
                    float: 'left'
                  }}>
                    {/*<Label>Post</Label>*/}
                    <Input onChange={this.setKeyword} placeholder="Keyword Search"></Input>
                  </FormGroup>
                  {this.checkData(this.props.filter)}
                  <Button className="search-style" color="primary" onClick={this.returnObjtoCallbackFunction}>Search</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
    )
  }
}
export default Search;
