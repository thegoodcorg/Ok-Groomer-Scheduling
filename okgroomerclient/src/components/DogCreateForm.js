import React from "react"
import { useState } from "react"

const [dogObj, setDogObj] = useState({})

export const DogCreateForm = () => {
    return <><div>This is where you will create a new dog</div>
        <Form onSubmit={registerClick}>
          <fieldset>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                onChange={(e) => {
                  const copy = { ...userProfile }
                  copy.firstName = e.target.value
                  setUserProfile(copy)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                onChange={(e) => {
                  const copy = { ...userProfile }
                  copy.lastName = e.target.value
                  setUserProfile(copy)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="text"
                onChange={(e) => {
                  const copy = { ...userProfile }
                  copy.email = e.target.value
                  setUserProfile(copy)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Input type="checkbox" onChange={(e) => {
                const copy = { ...userProfile }
                copy.groomer = e.target.checked
                setUserProfile(copy)
              }}></Input><span>are you registering as a groomer?</span>
            </FormGroup>
            <FormGroup>
              <Button>Register</Button>
            </FormGroup>
          </fieldset>
        </Form>
        </>
}