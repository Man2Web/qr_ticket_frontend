import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { QrReader } from 'react-qr-reader'
import getCameraPermission from 'src/hooks/camera'

export default function Homepage() {
  const { cameraPermission, requestCameraAccess } = getCameraPermission()
  return (
    <Card className="mx-2 overflow-hidden md:mx-0" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Welcome Back 👋</CardTitle>
        <CardDescription>Scan tickets below</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                console.log(result)
                // setData(result?.text)
              }
            }}
            constraints={{
              facingMode: 'environment',
            }}
          />
          {!cameraPermission && (
            <p className="mx-auto text-sm font-semibold text-red-400">Camera access is denied, Grant camera access.</p>
          )}
          {/* {!cameraPermission && <Button onClick={() => requestCameraAccess()}>Open Camera</Button>} */}
        </div>
      </CardContent>
    </Card>
  )
}
