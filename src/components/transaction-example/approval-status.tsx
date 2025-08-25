interface ApprovalStatusProps {
  approvalHash?: string
  isApprovalPending: boolean
  isApprovalConfirming: boolean
  isApprovalConfirmed: boolean
}

const ApprovalStatus = ({
  approvalHash,
  isApprovalPending,
  isApprovalConfirming,
  isApprovalConfirmed,
}: ApprovalStatusProps) => {
  if (
    !approvalHash &&
    !isApprovalPending &&
    !isApprovalConfirming &&
    !isApprovalConfirmed
  ) {
    return null
  }

  return (
    <div className="mb-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Approval Status</h3>

        {isApprovalPending && (
          <div className="flex items-center space-x-2 text-yellow-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400" />
            <span>Waiting for approval confirmation...</span>
          </div>
        )}

        {approvalHash && isApprovalConfirming && (
          <div className="flex items-center space-x-2 text-blue-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400" />
            <span>Approval submitted: {approvalHash}</span>
          </div>
        )}

        {isApprovalConfirmed && (
          <div className="text-green-400">
            <span>USDT approval confirmed! You can now execute the swap.</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApprovalStatus
