import React, { Component } from 'react'
import logic from '../../logic'
import GroupsList from '../Group/groupslist'
import img from '../../styles/images/banner.jpg'
import './style.css'
import { Collapse, Button, CardBody, Card, Input, Form, FormGroup } from 'reactstrap';


class Home extends Component {
	state = {
		groups: [],
		groupName: '',
		collapse: false
	}

	componentDidMount() {
		logic.listGroups()
			.then((groups) => this.setState({ groups }))
	}

	toggle = () => {
		this.setState({ collapse: !this.state.collapse });
	}

	createGroup = e => {
		e.preventDefault()
		const name = this.state.groupName

		logic.createGroup(name)
			.then(() => {
				return logic.listGroups()
			})
			.then(lists => {
				this.setState({
					groups: lists
				})
				console.log('created group')
			})

	}

	catchGroupName = e => {
		// e.preventDefault()
		this.setState({
			groupName: e.target.value
		})
	}

	showList() {
		return this.state.groups.map(group => <div>
			<button>{group.name}</button>
		</div>)
	}

	submit = (e) => {
		e.preventDefault()
		this.props.history.push(`/groups`)
	}

	render() {
		return <div id="banner">
			<img src={img} alt='background' />
			<section id="main" className="container-form-user">
				<div className="inner">
					{(this.state.groups.length > 0) ? <h1>These are your Groups</h1> : <h1>You don't belong to any group</h1>}
					<Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Click to Create a Group</Button>
					<Collapse isOpen={this.state.collapse}>
						<h5>Create a new Group</h5>
						<Card className='group-card'>
							<CardBody>
								<Form value={this.groupName} onSubmit={this.createGroup} >
									<FormGroup>
										<Input className="inner flex flex-3" type="text" onChange={this.catchGroupName} placeholder="group name" autoComplete="off" />
									</FormGroup>
									<Button >Create Group  </Button>
								</Form>
							</CardBody>
						</Card>
					</Collapse>
					<GroupsList groups={this.state.groups} />
				</div>
			</section>
			<Button onClick={() => {
				logic.logout()
				this.props.onLogout()
			}}>Logout</Button>
		</div>
	}
}

export default Home