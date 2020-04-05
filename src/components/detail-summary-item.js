import React from 'react'

import { Box, Text, Placeholder } from './shared'

const DetailSummaryItem = ({ data, children, border, ...props }) => {
  return (
    <Box position="relative" bg="white" px={28} py={20} {...props}>
      {border && (
        <Box
          position="absolute"
          left={12}
          right={12}
          top={0}
          height={1}
          bg="light"
        />
      )}

      {/* body */}
      <Box>
        <Placeholder autoRun visible={data ? true : false} width={100}>
          <Box flexDirection="row">
            <Text color="textLight" ml={-14} mr={8}>
              {data?.anlam_sira}
            </Text>
            <Text color="red">{data?.ozellik}</Text>
          </Box>
        </Placeholder>

        <Box mt={8}>
          <Placeholder autoRun visible={data ? true : false} width={240}>
            <Text fontWeight="600">{data?.anlam}</Text>
          </Placeholder>
          <Placeholder autoRun visible={data ? true : false} width={160} mt={4}>
            {data?.ornek.map(ornek => (
              <Box key={ornek.id}>
                <Text ml={10} mt={12} color="textLight" fontWeight="500">
                  {ornek.ornek}{' '}
                  <Text fontWeight="700" color="textLight">
                    {ornek.yazar}
                  </Text>
                </Text>
              </Box>
            ))}
          </Placeholder>
        </Box>
      </Box>
    </Box>
  )
}

export default DetailSummaryItem
