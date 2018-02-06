import React from 'react'
import axios, { post } from 'axios';

class SimpleReactFileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file:null,
            message: ''
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        if(this.state.file === ''){
            console.log('No file uploaded');
            this.setState({
                message: '*** Please upload a file'
            });
        }else {
            this.fileUpload(this.state.file).then((response) => {
                console.log(response.data);
            })
        }
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
        console.log('file name-----------------------------------------------------'+this.state.file);
        var url = 'http://'+localStorage.getItem('your_ip')+':8080/newfile';
        var formData = new FormData();
        formData.append('file',file)
        var config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': localStorage.getItem('tabner_token')
            }
        }
        return  post(url, formData,config)
    }

    render() {
        return (
        <div>
            <div className="fileupload-btn" style={{paddingTop: '20px'}}>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#importHours">Import Hours</button>
            </div>

            <div className="modal fade" id = "importHours" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="modalLabel" style={{float: 'left'}}>Upload Your File</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/*<div className="modal-body">
                            <form>
                                <div>
                                    <input type="file" onChange={this.onChange} required/>
                                </div>
                            </form>
                            <div>
                                <p>{this.state.message}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary" data-dismiss="modal" onSubmit={this.onFormSubmit.bind(this)}>Upload File</button>
                        </div>*/}
                        <div className="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="exampleFormControlFile1">Example file input</label>
                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" required/>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        {/*<input type="submit" className="btn btn-primary" data-dismiss="modal" onSubmit={this.onFormSubmit.bind(this)}>Upload File</input>*/}
                                        <input type="submit" value="Submit"/>
                                        </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}



export default SimpleReactFileUpload