import React from 'react'
import useSwr from 'swr'
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { TITLE, BASE_TEXT, GRAY } from '../constants/style/color';
import { OgpType } from '../interfaces';

interface CardProps {
  url: string
  onDelete: () => void
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Card = (props: CardProps) => {
  const { url, onDelete } = props
  const { data, error } = useSwr<OgpType, any>(`/api/ogp?url=${url}`, fetcher)
  console.log(data);
  const content = () => {
    if(error) {
      return (
        <>
          <ImageWrapper url={'/logo-blue.png'} />
          <TextWrapper>
            <Title href={url} >アプリケーションエラー</Title>
            <Description>しばらくしてから再度お試しください</Description>
          </TextWrapper>
        </>
      )
    }
    if(!data) {
      return (
        <>
          <ImageWrapper url={'/loading.gif'} />
        </>
      )
    }
    return (
      <>
        <ImageWrapper url={data.image} />
        <TextWrapper>
          <Title href={url} >{data.title}</Title>
          <Description>{data.description}</Description>
        </TextWrapper>
      </>
    )
  }

  return (
    <Container>
      <Wrapper>
        {content()}
      </Wrapper>
      <ActiveWrapper>
        <TrashButton icon={faTrashAlt} onClick={onDelete}  />
      </ActiveWrapper>
    </Container>
  )
}

export default Card

const Container = styled.div`
  margin: 5px;
  width: calc(25% - 10px);
  @media screen and (max-width: 992px) {
    width: calc(33.33% - 10px);
  }
  @media screen and (max-width: 600px) {
    width: calc(33.33% - 10px);
  }
`

const TextWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 250px;
  transition: all 0.2s ease;
`

const Wrapper = styled.div`
  &:hover {
    ${TextWrapper} {
      background-color: ${GRAY};
    }
  }
`

const ImageWrapper = styled.a<{url: string}>`
  text-decoration: none;
  display: flex;
  border-radius: 8px 8px 0 0;
  background-image: ${({url}) => `url(${url})`};
  background-size: cover;
  background-position: center top;
  height: 180px;
  @media screen and (max-width: 992px) {
    height: 150px;
  }
  @media screen and (max-width: 600px) {
    height: 150px;
  }
`

const Title = styled.a`
  text-decoration: none;
  color: ${TITLE};
  font-weight: bold;
`

const Description = styled.a`
  text-decoration: none;
  color: ${BASE_TEXT};
  font-size: 14px;
`

const ActiveWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${GRAY};
  padding: 15px 10px;
`

const TrashButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: ${BASE_TEXT};
  font-size: 15px;
  transition: all .3s ease;
  &:hover {
    opacity: .8;
  }
`