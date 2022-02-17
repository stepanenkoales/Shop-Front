import { Button, Row, Col, Form, Divider, Input } from 'antd'
const { TextArea } = Input

export const Checkout = (props) => {
  return (
    <>
      <h2>Review your order</h2>
      <h3>Delivery Terms</h3>
      <Form
        name="checkout"
        onFinish={props.onFinish}
        autoComplete="off"
        style={{
          marginTop: '10px',
          color: 'white',
          alignItems: 'flex-start',
          height: '300px',
        }}
      >
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Comments" name="comments">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              borderRadius: '0px',
              width: '159px',
            }}
            type="primary"
            htmlType="submit"
            className="register-button"
          >
            Place your order
          </Button>
        </Form.Item>
      </Form>

      <Row>
        <Col span={19} offset={1}>
          <p>
            By placing your order, you agree to E-shop's privacy notice and
            conditions of use. By placing your order, you agree to Terms and
            Conditions, and authorize us to charge your default payment method
            or any other payment method on file.
          </p>
        </Col>
      </Row>
      <Divider />
    </>
  )
}
