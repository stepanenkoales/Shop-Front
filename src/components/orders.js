import { Button, Card, Statistic } from 'antd'

export const Orders = (props) => {
  const totalOrderSum = (order) => {
    let totalSum = 0
    order.items.forEach((item) => {
      totalSum += item.order_item.price * item.order_item.quantity
    })

    return totalSum.toFixed(2)
  }

  const getDate = (timestamp) => {
    const date = new Date(timestamp).toString()
    return date.split(' ').slice(1, 5).join(' ')
  }

  return (
    <>
      {props.orders.map((order) => (
        <Card
          style={{ margin: '20px' }}
          key={order.id}
          title={`Order placed ${getDate(order.createdAt)}`}
        >
          <br></br>
          <p>{`Status: ${order.status}`}</p>
          <p>{`Ship to: ${order.address}`}</p>
          <Statistic
            title={'Total'}
            value={totalOrderSum(order)}
            prefix={'$'}
            precision={2}
          />
          {order.items.map((item) => (
            <Card
              key={item.id}
              type="inner"
              style={{ marginTop: '16px' }}
              hoverable
            >
              <Card.Meta title={item.name} description={item.description} />
              <br></br>
              <p>{`Quantity: ${item.order_item.quantity}`}</p>
              <p>{`Sale Price: ${item.order_item.price}`}</p>
            </Card>
          ))}
          {order.status === 'pending' && (
            <Button
              type="primary"
              style={{ marginTop: 16 }}
              onClick={() => props.onClick(order.id)}
            >
              Cancel Order
            </Button>
          )}
        </Card>
      ))}
    </>
  )
}
