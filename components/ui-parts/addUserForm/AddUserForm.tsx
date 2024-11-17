import Button from '@/components/ui-elements/button/Button'
import InputText from '@/components/ui-elements/input/InputText'
import React from 'react'

const AddUserForm = () => {
  return (
    <form>
        <div className="mt-8">
            <InputText
                placeholder="ユーザー名"
            />
        </div>
        <div className="mt-4">
            <Button>
                追加する
            </Button>
        </div>
    </form>
  )
}

export default AddUserForm